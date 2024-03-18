#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StagingCdPipelineStack } from '../lib/staging-cd-pipeline-stack';
import { ServiceStack } from '../lib/service-stack';

function StringOrUndefined(value: any): string | undefined {
  return value !== undefined ? String(value) : undefined;
}

const app = new cdk.App();

const config = {
  staging: {
    accountId: String(app.node.getContext('staging:accountId')),
    region: String(app.node.getContext('staging:region')),
    vpcId: String(app.node.getContext('staging:vpcId')),
    ecsClusterName: String(app.node.getContext('staging:ecsClusterName')),
    githubSource: {
      owner: String(app.node.getContext('staging:githubSourceOwner')),
      repo: String(app.node.getContext('staging:githubSourceRepo')),
      branch: StringOrUndefined(
        app.node.tryGetContext('staging:githubSourceBranch'),
      ),
      oauthTokenSecretId: StringOrUndefined(
        app.node.tryGetContext('staging:githubSourceOAuthTokenSecretId'),
      ),
    },
  },
};

const stagingEnv = {
  account: config.staging.accountId,
  region: config.staging.region,
};

const stagingCdPipelineStack = new StagingCdPipelineStack(
  app,
  'StagingBackendCdPipelineStack',
  { env: stagingEnv, githubSource: config.staging.githubSource },
);
new ServiceStack(app, 'StagingBackendServiceStack', {
  env: stagingEnv,
  vpcId: config.staging.vpcId,
  ecsClusterName: config.staging.ecsClusterName,
  image: stagingCdPipelineStack.tagParameterContainerImage,
});
