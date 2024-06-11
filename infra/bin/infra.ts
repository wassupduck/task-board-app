#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack";
import { EcsClusterStack } from "../lib/ecs-cluster-stack";
import { RdsStack } from "../lib/rds-stack";
import { BastionHostStack } from "../lib/basion-host-stack";

const app = new cdk.App();

const stagingEnv = {
  account: process.env.CDK_STAGING_ACCOUNT,
  region: process.env.CDK_STAGING_REGION,
};

const stagingVpcStack = new VpcStack(app, "StagingVpcStack", {
  env: stagingEnv,
});
new EcsClusterStack(app, "StagingEcsClusterStack", {
  env: stagingEnv,
  vpc: stagingVpcStack.vpc,
});
const stagingRdsStack = new RdsStack(app, "StagingRdsStack", {
  env: stagingEnv,
  vpc: stagingVpcStack.vpc,
});
new BastionHostStack(app, "StagingBastionHostStack", {
  env: stagingEnv,
  vpc: stagingVpcStack.vpc,
  rdsDatabaseInstanceSecurityGroup: stagingRdsStack.instanceSecurityGroup,
});
