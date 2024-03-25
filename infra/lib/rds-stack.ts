import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class RdsStack extends cdk.Stack {
  public readonly instanceSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    this.instanceSecurityGroup = new ec2.SecurityGroup(
      this,
      "DatabaseInstanceSecurityGroup",
      { vpc: props.vpc }
    );

    const instance = new rds.DatabaseInstance(this, "DatabaseInstance", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16_1,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE4_GRAVITON,
        ec2.InstanceSize.MICRO
      ),
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      iamAuthentication: true,
      securityGroups: [this.instanceSecurityGroup],
    });
    instance.addRotationSingleUser();

    new cdk.CfnOutput(this, "DatabaseInstanceEndpointAndress", {
      value: instance.dbInstanceEndpointAddress,
    });
    new cdk.CfnOutput(this, "DatabaseInstanceSecurityGroupId", {
      value: this.instanceSecurityGroup.securityGroupId,
    });
  }
}
