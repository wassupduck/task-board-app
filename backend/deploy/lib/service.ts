import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export interface ServiceProps {
  readonly ecsCluster: ecs.ICluster;
  readonly imageRepo: ecr.IRepository;
}

export class Service extends Construct {
  readonly imageTagParamaterName: string;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const containerImage = new ecs.TagParameterContainerImage(props.imageRepo);
    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'FargateService',
      {
        cluster: props.ecsCluster,
        memoryLimitMiB: 512,
        cpu: 256,
        taskImageOptions: {
          image: containerImage,
          containerPort: 3000,
          logDriver: new ecs.AwsLogDriver({
            streamPrefix: 'backend-service-web',
          }),
        },
      },
    );

    this.imageTagParamaterName = containerImage.tagParameterName;
  }
}
