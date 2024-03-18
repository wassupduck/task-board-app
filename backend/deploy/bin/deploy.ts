#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StagingStack } from '../lib/staging-stack';

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

new StagingStack(app, 'StagingBackendStack', {
  env: stagingEnv,
  vpcId: config.staging.vpcId,
  ecsClusterName: config.staging.ecsClusterName,
  githubSource: config.staging.githubSource,
});
