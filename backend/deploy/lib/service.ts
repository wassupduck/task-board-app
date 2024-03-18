import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface ServiceProps extends cdk.StackProps {
  ecsCluster: ecs.ICluster;
}

export class Service extends Construct {
  public readonly ecsService: ecs.FargateService;
  public readonly taskContainerName: string;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const starterImage = 'public.ecr.aws/amazonlinux/amazonlinux:2022';
    const taskContainerName = 'api';
    const loadBalancedFargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
        cluster: props.ecsCluster,
        memoryLimitMiB: 512,
        cpu: 256,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry(starterImage),
          containerPort: 3000,
          containerName: taskContainerName,
          logDriver: new ecs.AwsLogDriver({
            streamPrefix: 'backend-api',
          }),
        },
      });

    this.ecsService = loadBalancedFargateService.service;
    this.taskContainerName = taskContainerName;
  }
}
