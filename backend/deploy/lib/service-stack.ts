import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { Service } from './service';

interface ServiceStackConfig {
  vpcId: string;
  ecsClusterName: string;
  db: {
    instanceResourceId: string;
    instanceEndpointAddress: string;
    instanceSecurityGroupId: string;
    dbName: string;
    dbUser: string;
  };
  jwtSecretSecretArn: string;
  frontendUrl: string;
}

export interface ServiceStackProps extends cdk.StackProps {
  readonly imageRepo: ecr.IRepository;
}

export class ServiceStack extends cdk.Stack {
  public readonly service: Service;

  constructor(scope: Construct, id: string, props: ServiceStackProps) {
    super(scope, id, props);

    const config = this.configFromLookup('backend-service-stack-config');

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: config.vpcId });

    const cluster = ecs.Cluster.fromClusterAttributes(this, 'EcsCluster', {
      vpc,
      clusterName: config.ecsClusterName,
    });

    const dbSecurityGroup = ec2.SecurityGroup.fromLookupById(
      this,
      'DatabaseSecurityGroup',
      config.db.instanceSecurityGroupId,
    );

    this.service = new Service(this, 'StagingBackendService', {
      ...config,
      vpc,
      ecsCluster: cluster,
      imageRepo: props.imageRepo,
      db: {
        ...config.db,
        instanceSecurityGroup: dbSecurityGroup,
      },
    });
  }

  configFromLookup(ssmParameterName: string): ServiceStackConfig {
    const configString = ssm.StringParameter.valueFromLookup(
      this,
      ssmParameterName,
    );

    if (configString.includes('dummy-value')) {
      // Dummy config
      // see: https://sdhuang32.github.io/ssm-StringParameter-valueFromLookup-use-cases-and-internal-synth-flow/
      return {
        vpcId: 'vpc-01234567890abcdef',
        ecsClusterName: 'ServiceStack-DummyEcsCluster-NT5EUXTNTXXD',
        db: {
          instanceResourceId: 'db-ABCDEFGHIJKL01234',
          instanceEndpointAddress:
            'example.aslfdewrlk.eu-west-2.rds.amazonaws.com',
          instanceSecurityGroupId: 'sg-abcdefghijkl01234',
          dbName: 'task_board_app',
          dbUser: 'task_board_app_user',
        },
        jwtSecretSecretArn:
          'arn:aws:secretsmanager:us-west-2:123456789012:secret:Secret-a1b2c3',
        frontendUrl: 'https://www.task-board-app.com',
      };
    }

    // TODO: Validation
    return JSON.parse(configString) as ServiceStackConfig;
  }
}
