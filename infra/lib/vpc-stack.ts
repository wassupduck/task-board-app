import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = (this.vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2, // Minimum 2 required to host RDS instances.
      natGateways: 0, // Cost saving. Creates isolated subnet instead of private.
      vpnGateway: false,
    }));

    // VPC endpoints.
    // TODO: Endpoint policies.

    vpc.addGatewayEndpoint("S3Endpoint", {
      service: ec2.GatewayVpcEndpointAwsService.S3,
    });
    // Amazon ECS tasks hosted on Fargate using Linux platform version 1.4.0 or later
    // require both the com.amazonaws.region.ecr.dkr and com.amazonaws.region.ecr.api
    // Amazon ECR VPC endpoints as well as the Amazon S3 gateway endpoint.
    // https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html
    vpc.addInterfaceEndpoint("EcrEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
      privateDnsEnabled: true,
    });
    vpc.addInterfaceEndpoint("EcrDockerEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
      privateDnsEnabled: true,
    });
    // Amazon ECS tasks hosted on Fargate that use the awslogs log driver to send log information
    // to CloudWatch Logs require the CloudWatch Logs VPC endpoint.
    vpc.addInterfaceEndpoint("CloudWatchLogsEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
      privateDnsEnabled: true,
    });
    // Bastion host communicates with the interface VPC endpoints for Systems Manager and Amazon EC2.
    vpc.addInterfaceEndpoint("SsmEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.SSM,
      privateDnsEnabled: true,
    });
    vpc.addInterfaceEndpoint("Ec2MessagesEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES,
      privateDnsEnabled: true,
    });
    vpc.addInterfaceEndpoint("SsmMessagesEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
      privateDnsEnabled: true,
    });
  }
}
