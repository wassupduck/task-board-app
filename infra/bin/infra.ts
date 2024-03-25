#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack";
import { EcsClusterStack } from "../lib/ecs-cluster-stack";
import { RdsStack } from "../lib/rds-stack";
import { BastionHostStack } from "../lib/basion-host-stack";

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
const rdsStackStaging = new RdsStack(app, "RdsStackStaging", {
  env,
  vpc: vpcStackStaging.vpc,
});
new BastionHostStack(app, "BastionHostStackStaging", {
  env,
  vpc: vpcStackStaging.vpc,
  rdsDatabaseInstanceSecurityGroup: rdsStackStaging.instanceSecurityGroup,
});

app.synth();
