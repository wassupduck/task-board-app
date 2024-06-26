import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as assets from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import { ServiceStack } from './service-stack';

export interface StagingPipelineProps {
  readonly imageRepo: ecr.IRepository;
  readonly serviceStack: ServiceStack;
  readonly githubSource: {
    readonly owner: string;
    readonly repo: string;
    readonly branch: string;
    readonly oauthTokenSecretId: string;
  };
}

// Based on: https://docs.aws.amazon.com/cdk/api/v1/docs/aws-codepipeline-actions-readme.html#deploying-ecs-applications-stored-in-a-separate-source-code-repository
export class StagingPipeline extends Construct {
  constructor(scope: Construct, id: string, props: StagingPipelineProps) {
    super(scope, id);

    // By default, a cdk synth performed in a pipeline will not have permissions to
    // perform context lookups, and the lookups will fail. This is by design.
    // The recommended way of using lookups is by running cdk synth on the developer
    // workstation and checking in the cdk.context.json file, which contains the
    // results of the context lookups. However given this is a public repo checking-in
    // the cdk.context.json is not recommended for security reasons.
    // To get around this we store the cdk.context.json file in s3 and and inject it
    // into the build environment before cdk synth is performed.
    // To update the service context, reset it locally, update the
    // context paramater store value, and redeploy the pipeline stack.
    // Inspired from: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html#context-lookups
    // TODO: Find a better way to do this.
    const cdkContextAsset = new assets.Asset(this, 'CdkContextAsset', {
      path: path.join(__dirname, '../'),
      // CodeBuild needs s3 sources be zip files.
      // Hack to upload context file in zip file.
      bundling: {
        image: cdk.DockerImage.fromRegistry('alpine'),
        command: [
          '/bin/sh',
          '-c',
          'cp cdk.context.json /asset-output/cdk.context.json',
        ],
        outputType: cdk.BundlingOutput.NOT_ARCHIVED,
      },
    });
    const cdkContextSourceOutput = new codepipeline.Artifact(
      'cdk_context_source',
    );
    const cdkContextSourceAction = new codepipelineActions.S3SourceAction({
      actionName: 'S3_Source',
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
        props.githubSource.oauthTokenSecretId,
      ),
      output: githubSourceOuput,
      branch: props.githubSource.branch,
      trigger: codepipelineActions.GitHubTrigger.NONE,
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
                'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com',
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
          AWS_ACCOUNT_ID: {
            value: cdk.Stack.of(this).account,
          },
          IMAGE_REPO_URI: {
            value: props.imageRepo.repositoryUri,
          },
        },
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
          privileged: true,
        },
      },
    );
    props.imageRepo.grantPush(dockerImageBuild);

    const dockerImageBuildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'Docker_Image_Build',
      project: dockerImageBuild,
      input: githubSourceOuput,
    });

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
              `cp $CODEBUILD_SRC_DIR_${cdkContextSourceOutput.artifactName}/cdk.context.json .`,
            ],
          },
          build: {
            commands: ['yarn cdk synth --verbose'],
          },
        },
        artifacts: {
          'base-directory': 'backend/deploy/cdk.out',
          files: '**/*',
        },
      }),
      environmentVariables: {
        CDK_STAGING_ACCOUNT: {
          value: cdk.Stack.of(this).account,
        },
        CDK_STAGING_REGION: {
          value: cdk.Stack.of(this).region,
        },
      },
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

    const serviceStackName = props.serviceStack.stackName;
    const deployAction =
      new codepipelineActions.CloudFormationCreateUpdateStackAction({
        actionName: 'CFN_Deploy',
        stackName: serviceStackName,
        templatePath: cdkBuildOutput.atPath(
          `${serviceStackName}.template.json`,
        ),
        adminPermissions: true,
        parameterOverrides: {
          [props.serviceStack.service.imageTagParamaterName]:
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
