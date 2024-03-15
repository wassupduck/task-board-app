#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
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
      app.node.getContext('githubSourceOAuthTokenSecretId'),
    ),
  },
};

const vpc = ec2.Vpc.fromLookup(app, 'Vpc', { vpcId: config.vpcId });

const cluster = ecs.Cluster.fromClusterAttributes(app, 'EcsCluster', {
  vpc,
  clusterName: config.ecsClusterName,
});

const stagingBaseStack = new BaseStack(app, 'StagingBackendBaseStack');

const stagingAppStack = new AppStack(app, 'StagingBackendAppStack', {
  env,
  cluster,
  imageRepo: stagingBaseStack.imageRepo,
});

new StagingDeployPipelineStack(app, 'StagingBackendDeployPipelineStack', {
  env,
  githubSource: config.githubSource,
  imageRepo: stagingBaseStack.imageRepo,
  stagingAppStack,
});
