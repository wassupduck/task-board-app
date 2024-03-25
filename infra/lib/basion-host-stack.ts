import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

// Connecting to the basion host is described here: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/access-a-bastion-host-by-using-session-manager-and-amazon-ec2-instance-connect.html
// TODO: Add connection instructions to README

export interface BastionHostStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  rdsDatabaseInstanceSecurityGroup: ec2.ISecurityGroup;
}

export class BastionHostStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BastionHostStackProps) {
    super(scope, id, props);

    const bastion = new ec2.BastionHostLinux(this, "BastionHost", {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      subnetSelection: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    });

    bastion.connections.allowTo(
      props.rdsDatabaseInstanceSecurityGroup,
      ec2.Port.tcp(5432)
    );
  }
}
