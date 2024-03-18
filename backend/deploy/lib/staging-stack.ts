import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import { Service } from './service';
import { StagingDeployPipeline } from './staging-deploy-pipeline';

export interface StagingStackProps extends cdk.StackProps {
  vpcId: string;
  ecsClusterName: string;
  githubSource: {
    owner: string;
    repo: string;
    branch?: string;
    oauthTokenSecretId?: string;
  };
}

export class StagingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StagingStackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: props.vpcId });

    const ecsCluster = ecs.Cluster.fromClusterAttributes(this, 'EcsCluster', {
      vpc,
      clusterName: props.ecsClusterName,
    });

    const service = new Service(this, 'Service', { ecsCluster });
    new StagingDeployPipeline(this, 'DeployPipeline', {
      service,
      githubSource: props.githubSource,
    });
  }
}
