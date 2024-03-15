#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';
import { StagingDeployPipelineStack } from '../lib/staging-deploy-pipeline-stack';
import { BaseStack } from '../lib/base-stack';

function StringOrUndefined(value: any): string | undefined {
  return value !== undefined ? String(value) : undefined;
}

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

const config = {
  vpcId: String(app.node.getContext('vpcId')),
  ecsClusterName: String(app.node.getContext('ecsClusterName')),
  githubSource: {
    owner: String(app.node.getContext('githubSourceOwner')),
    repo: String(app.node.getContext('githubSourceRepo')),
    branch: StringOrUndefined(app.node.tryGetContext('githubSourceBranch')),
    oauthTokenSecretId: StringOrUndefined(
      app.node.tryGetContext('githubSourceOAuthTokenSecretId'),
    ),
  },
};

const stagingBaseStack = new BaseStack(app, 'StagingBackendBaseStack', { env });

const stagingAppStack = new AppStack(app, 'StagingBackendAppStack', {
  env,
  vpcId: config.vpcId,
  ecsClusterName: config.ecsClusterName,
  imageRepo: stagingBaseStack.imageRepo,
});

const stagingDeployPipelineStack = new StagingDeployPipelineStack(
  app,
  'StagingBackendDeployPipelineStack',
  {
    env,
    githubSource: config.githubSource,
    imageRepo: stagingBaseStack.imageRepo,
    stagingAppStack,
  },
);
stagingDeployPipelineStack.addDependency(stagingBaseStack);
