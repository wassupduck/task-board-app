import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface ServiceStackProps extends cdk.StackProps {
  readonly vpcId: string;
  readonly ecsClusterName: string;
  readonly image: ecs.ContainerImage;
}

export class ServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServiceStackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: props.vpcId });

    const cluster = ecs.Cluster.fromClusterAttributes(this, 'EcsCluster', {
      vpc,
      clusterName: props.ecsClusterName,
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster: cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: props.image,
        containerPort: 3000,
        logDriver: new ecs.AwsLogDriver({
          streamPrefix: 'backend-api',
        }),
      },
    });
  }
}
