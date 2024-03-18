import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';
import { Service } from './service';

export interface StagingDeployPipelineProps extends cdk.StackProps {
  service: Service;
  githubSource: {
    owner: string;
    repo: string;
    branch?: string;
    oauthTokenSecretId?: string;
  };
}

// Based on: https://github.com/aws-samples/amazon-ecs-fargate-cdk-v2-cicd

export class StagingDeployPipeline extends Construct {
  constructor(scope: Construct, id: string, props: StagingDeployPipelineProps) {
    super(scope, id);

    const imageRepo = new ecr.Repository(this, 'ImageRepo', {
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
    });

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
                'export IMAGE_TAG=$CODEBUILD_RESOLVED_SOURCE_VERSION',
              ],
            },
            build: {
              commands: [
                'docker build -t $IMAGE_REPO_URI:$IMAGE_TAG -f Dockerfile --build-arg BACKEND_VERSION=$IMAGE_TAG .',
                'docker push $IMAGE_REPO_URI:$IMAGE_TAG',
              ],
            },
            post_build: {
              commands: [
                `printf '[{"name":"${props.service.taskContainerName}","imageUri":"%s"}]' $IMAGE_REPO_URI:$IMAGE_TAG > imagedefinitions.json`,
              ],
            },
          },
          artifacts: {
            'base-directory': 'backend',
            files: 'imagedefinitions.json',
          },
        }),
        environmentVariables: {
          AWS_ACCOUNT_ID: {
            value: cdk.Stack.of(this).account,
          },
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
      input: sourceOutput,
      outputs: [dockerImageBuildOutput],
    });

    const deployAction = new codepipelineActions.EcsDeployAction({
      actionName: 'Ecs_Deploy_Action',
      service: props.service.ecsService,
      input: dockerImageBuildOutput,
    });

    new codepipeline.Pipeline(this, 'DeployPipeline', {
      pipelineType: codepipeline.PipelineType.V2,
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [dockerImageBuildAction],
        },
        {
          stageName: 'Deploy',
          actions: [deployAction],
        },
      ],
    });
  }
}
