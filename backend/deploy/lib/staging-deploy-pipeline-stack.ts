import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';
import { AppStack } from './app-stack';

export interface StagingDeployPipelineStackProps extends cdk.StackProps {
  githubSource: {
    owner: string;
    repo: string;
    branch?: string;
    oauthTokenSecretId?: string;
  };
  imageRepo: ecr.IRepository;
  stagingAppStack: AppStack;
}

export class StagingDeployPipelineStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StagingDeployPipelineStackProps,
  ) {
    super(scope, id, props);

    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipelineActions.GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner: props.githubSource.owner,
      repo: props.githubSource.repo,
      oauthToken: cdk.SecretValue.secretsManager(
        props.githubSource.oauthTokenSecretId ?? 'github-access-token',
      ),
      output: sourceOutput,
      branch: props.githubSource.branch ?? 'main',
      trigger: codepipelineActions.GitHubTrigger.NONE,
    });

    const dockerImageBuildOutput = new codepipeline.Artifact(
      'DockerImageBuildOutput',
    );
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
                'COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)',
                'IMAGE_TAG=$COMMIT_HASH',
              ],
            },
            build: {
              commands: [
                'docker build -t $IMAGE_REPO_URI:$IMAGE_TAG -f Dockerfile --build-arg BACKEND_VERSION=$IMAGE_TAG .',
              ],
            },
            post_build: {
              commands: [
                'docker push $IMAGE_REPO_URI:$IMAGE_TAG',
                `printf '{ "imageTag": "%s" }' $IMAGE_TAG > imageTag.json`,
              ],
            },
          },
          artifacts: {
            'base-directory': 'backend/deploy/dist',
            files: 'imageTag.json',
          },
        }),
        environmentVariables: {
          AWS_ACCOUNT_ID: {
            value: this.account,
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
      input: sourceOutput,
      outputs: [dockerImageBuildOutput],
    });

    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');
    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: ['cd backend/deploy', 'yarn install'],
          },
          build: {
            commands: [
              'yarn build',
              `yarn cdk synth ${props.stagingAppStack.stackName} -- -o dist`,
            ],
          },
        },
        artifacts: {
          'base-directory': 'backend/deploy/dist',
          files: [`${props.stagingAppStack.stackName}.template.json`],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
      },
    });
    const cdkBuildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'CDK_Build',
      project: cdkBuild,
      input: sourceOutput,
      outputs: [cdkBuildOutput],
    });

    const deployAction =
      new codepipelineActions.CloudFormationCreateUpdateStackAction({
        actionName: 'CFN_Deploy',
        stackName: props.stagingAppStack.stackName,
        templatePath: cdkBuildOutput.atPath(
          `${props.stagingAppStack.stackName}.template.json`,
        ),
        adminPermissions: true,
        parameterOverrides: {
          [props.stagingAppStack.imageTagParam.logicalId]:
            dockerImageBuildOutput.getParam('imageTag.json', 'imageTag'),
        },
        extraInputs: [dockerImageBuildOutput],
      });

    new codepipeline.Pipeline(this, 'DeployPipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
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
