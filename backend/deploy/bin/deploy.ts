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
    accountId: String(app.node.getContext('staging:AccountId')),
    region: String(app.node.getContext('staging:Region')),
    vpcId: String(app.node.getContext('staging:VpcId')),
    ecsClusterName: String(app.node.getContext('staging:EcsClusterName')),
    githubSource: {
      owner: String(app.node.getContext('staging:GithubSourceOwner')),
      repo: String(app.node.getContext('staging:GithubSourceRepo')),
      branch: StringOrUndefined(
        app.node.tryGetContext('staging:GithubSourceBranch'),
      ),
      oauthTokenSecretId: StringOrUndefined(
        app.node.tryGetContext('staging:GithubSourceOAuthTokenSecretId'),
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
