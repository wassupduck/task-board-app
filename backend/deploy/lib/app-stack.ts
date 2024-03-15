import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export interface AppStackProps extends cdk.StackProps {
  cluster: ecs.ICluster;
  imageRepo: ecr.IRepository;
}

export class AppStack extends cdk.Stack {
  public readonly imageTagParam: cdk.CfnParameter;

  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    this.imageTagParam = new cdk.CfnParameter(this, 'ImageTagParam', {
      type: 'String',
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster: props.cluster,
      memoryLimitMiB: 256,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(
          props.imageRepo,
          this.imageTagParam.valueAsString,
        ),
        containerPort: 3000,
      },
    });
  }
}
