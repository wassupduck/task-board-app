import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cost saving.
    // Warning: The NAT instances created using this method will be unmonitored.
    // They are not part of an Auto Scaling Group, and if they become unavailable
    // or are terminated for any reason, will not be restarted or replaced.
    const natGatewayProvider = ec2.NatProvider.instanceV2({
      instanceType: new ec2.InstanceType("t2.micro"),
    });

    this.vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2, // Minimum 2 required to host RDS instances.
      natGatewayProvider,
      vpnGateway: false,
    });
  }
}
