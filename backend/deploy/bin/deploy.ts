#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ServiceStack } from '../lib/service-stack';
import { StagingPipelineStack } from '../lib/staging-pipeline-stack';
import { BaseStack } from '../lib/base-stack';

const app = new cdk.App();

const stagingEnv = {
  account: process.env.CDK_STAGING_ACCOUNT,
  region: process.env.CDK_STAGING_REGION,
};

const stagingBaseStack = new BaseStack(app, 'StagingBackendBaseStack', {
  env: stagingEnv,
});
const stagingServiceStack = new ServiceStack(
  app,
  'StagingBackendServiceStack',
  {
    env: stagingEnv,
    imageRepo: stagingBaseStack.imageRepo,
  },
);
new StagingPipelineStack(app, 'BackendStagingPipelineStack', {
  env: stagingEnv,
  imageRepo: stagingBaseStack.imageRepo,
  serviceStack: stagingServiceStack,
});
