import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

export interface StagingCdPipelineStackProps extends cdk.StackProps {
  githubSource: {
    owner: string;
    repo: string;
    branch?: string;
    oauthTokenSecretId?: string;
  };
}

export class StagingCdPipelineStack extends cdk.Stack {
  // Based on: https://docs.aws.amazon.com/cdk/api/v1/docs/aws-codepipeline-actions-readme.html#deploying-ecs-applications-stored-in-a-separate-source-code-repository

  public readonly tagParameterContainerImage: ecs.TagParameterContainerImage;

  constructor(
    scope: Construct,
    id: string,
    props: StagingCdPipelineStackProps,
  ) {
    super(scope, id, props);

    // By default, a cdk synth performed in a pipeline will not have permissions to
    // perform context lookups, and the lookups will fail. This is by design.
    // The recommended way of using lookups is by running cdk synth on the developer workstation and
    // checking in the cdk.context.json file, which contains the results of the context lookups.
    // However given this is a public repo checking in the cdk.context.json is not recommended for security reason.
    // To get around this we store the cdk.context.json file in s3 and and inject it into the build
    // environment before cdk synth is performed.
    // Inspired from: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html#context-lookups
    const cdkContextAsset = new assets.Asset(this, 'CdkContextAsset', {
      path: path.join(__dirname, '../cdk.context.json'),
    });
    const cdkContextSourceOutput = new codepipeline.Artifact(
      'cdk_context_source',
    );
    const cdkContextSourceAction = new codepipelineActions.S3SourceAction({
      actionName: 'S3Source',
      bucket: cdkContextAsset.bucket,
      bucketKey: cdkContextAsset.s3ObjectKey,
      output: cdkContextSourceOutput,
      trigger: codepipelineActions.S3Trigger.NONE,
    });

    const githubSourceOuput = new codepipeline.Artifact();
    const githubSourceAction = new codepipelineActions.GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner: props.githubSource.owner,
      repo: props.githubSource.repo,
      oauthToken: cdk.SecretValue.secretsManager(
        props.githubSource.oauthTokenSecretId ?? 'github-access-token',
      ),
      output: githubSourceOuput,
      branch: props.githubSource.branch ?? 'main',
      trigger: codepipelineActions.GitHubTrigger.NONE,
    });

    const imageRepo = new ecr.Repository(this, 'ImageRepo', {
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
    });

    const dockerImageBuild = new codebuild.PipelineProject(
      this,
      'DockerImageBuild',
      {
        buildSpec: codebuild.BuildSpec.fromObjectToYaml({
          version: '0.2',
          phases: {
            pre_build: {
              commands: [
                'cd backend',
                '$(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)',
                'export IMAGE_TAG=$CODEBUILD_RESOLVED_SOURCE_VERSION',
              ],
            },
            build: {
              commands: [
                'docker build -t $IMAGE_REPO_URI:$IMAGE_TAG -f Dockerfile --build-arg BACKEND_VERSION=$IMAGE_TAG .',
                'docker push $IMAGE_REPO_URI:$IMAGE_TAG',
              ],
            },
          },
          env: {
            'exported-variables': ['IMAGE_TAG'],
          },
        }),
        environmentVariables: {
          IMAGE_REPO_URI: {
            value: imageRepo.repositoryUri,
          },
        },
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
          privileged: true,
        },
      },
    );
    imageRepo.grantPush(dockerImageBuild);

    const dockerImageBuildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'Docker_Image_Build',
      project: dockerImageBuild,
      input: githubSourceOuput,
    });

    this.tagParameterContainerImage = new ecs.TagParameterContainerImage(
      imageRepo,
    );
    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');
    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'cd backend/deploy',
              'yarn install',
              'yarn build',
              `cp CODEBUILD_SRC_DIR_${cdkContextSourceOutput.artifactName}/cdk.context.json .`,
            ],
          },
          build: {
            commands: ['yarn cdk synth --verbose'],
          },
        },
        artifacts: {
          'base-directory': 'cdk.out',
          files: '**/*',
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
      },
    });
    const cdkBuildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'CDK_Build',
      project: cdkBuild,
      input: githubSourceOuput,
      extraInputs: [cdkContextSourceOutput],
      outputs: [cdkBuildOutput],
    });

    const stagingServiceStackName = 'StagingBackendServiceStack';
    const deployAction =
      new codepipelineActions.CloudFormationCreateUpdateStackAction({
        actionName: 'CFN_Deploy',
        stackName: stagingServiceStackName,
        templatePath: cdkBuildOutput.atPath(
          `${stagingServiceStackName}.template.json`,
        ),
        adminPermissions: true,
        parameterOverrides: {
          [this.tagParameterContainerImage.tagParameterName]:
            dockerImageBuildAction.variable('IMAGE_TAG'),
        },
      });

    new codepipeline.Pipeline(this, 'DeployPipeline', {
      pipelineType: codepipeline.PipelineType.V2,
      stages: [
        {
          stageName: 'Source',
          actions: [githubSourceAction, cdkContextSourceAction],
        },
        {
          stageName: 'Build',
          actions: [dockerImageBuildAction, cdkBuildAction],
        },
        {
          stageName: 'Deploy',
          actions: [deployAction],
        },
      ],
    });
  }
}
