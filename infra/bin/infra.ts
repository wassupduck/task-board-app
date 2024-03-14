#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack";
import { EcsClusterStack } from "../lib/ecs-cluster-stack";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

const vpcStackStaging = new VpcStack(app, "VpcStackStaging", {
  env,
});
new EcsClusterStack(app, "EcsClusterStackStaging", {
  env,
  vpc: vpcStackStaging.vpc,
});

app.synth();
