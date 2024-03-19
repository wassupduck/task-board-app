import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export interface ServiceStackConfig {
  vpcId: string;
  ecsClusterName: string;
}

export interface ServiceStackProps extends cdk.StackProps {
  readonly image: ecs.ContainerImage;
}

export class ServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServiceStackProps) {
    super(scope, id, props);

    const config = this.configFromLookup('backend-service-stack-config');

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: config.vpcId });

    const cluster = ecs.Cluster.fromClusterAttributes(this, 'EcsCluster', {
      vpc,
      clusterName: config.ecsClusterName,
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster: cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: props.image,
        containerPort: 3000,
        logDriver: new ecs.AwsLogDriver({
          streamPrefix: 'backend-service-api',
        }),
      },
    });
  }

  configFromLookup(ssmParameterName: string): ServiceStackConfig {
    const configString = ssm.StringParameter.valueFromLookup(
      this,
      ssmParameterName,
    );
    if (configString.includes('dummy-value')) {
      return {
        vpcId: 'vpc-01234567890abcdef',
        ecsClusterName: 'ServiceStack-DummyEcsCluster-NT5EUXTNTXXD',
      };
    }
    return JSON.parse(configString) as ServiceStackConfig;
  }
}
