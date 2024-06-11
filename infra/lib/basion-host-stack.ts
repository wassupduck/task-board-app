import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export interface BastionHostStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  rdsDatabaseInstanceSecurityGroup: ec2.ISecurityGroup;
}

export class BastionHostStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BastionHostStackProps) {
    super(scope, id, props);

    const bastion = new ec2.BastionHostLinux(this, "BastionHost", {
      vpc: props.vpc,
      instanceType: new ec2.InstanceType("t2.micro"),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      subnetSelection: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    bastion.connections.allowTo(
      props.rdsDatabaseInstanceSecurityGroup,
      ec2.Port.tcp(5432)
    );
  }
}
