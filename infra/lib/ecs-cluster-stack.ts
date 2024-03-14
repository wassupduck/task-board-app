import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

export interface EcsClusterStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class EcsClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcsClusterStackProps) {
    super(scope, id, props);

    new ecs.Cluster(this, "EcsCluster", {
      vpc: props.vpc,
      enableFargateCapacityProviders: true,
    });
  }
}
