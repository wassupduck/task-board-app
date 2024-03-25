import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';

export interface ServiceProps {
  readonly vpc: ec2.IVpc;
  readonly ecsCluster: ecs.ICluster;
  readonly imageRepo: ecr.IRepository;
  readonly db: {
    readonly instanceResourceId: string;
    readonly instanceEndpointAddress: string;
    readonly dbName: string;
    readonly dbUserName: string;
    readonly instanceSecurityGroup: ec2.ISecurityGroup;
  };
}

export class Service extends Construct {
  readonly imageTagParamaterName: string;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const containerImage = new ecs.TagParameterContainerImage(props.imageRepo);

    const taskRole = new iam.Role(this, 'TaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });
    taskRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['rds-db:connect'],
        resources: [
          `arn:aws:rds-db:${Stack.of(this).region}:${Stack.of(this).account}:dbuser:${props.db.instanceResourceId}/${props.db.dbUserName}`,
        ],
      }),
    );

    const fargateServiceSecurityGroup = new ec2.SecurityGroup(
      this,
      'FargateServiceSecurityGroup',
      { vpc: props.vpc, allowAllOutbound: true },
    );
    props.db.instanceSecurityGroup.addIngressRule(
      fargateServiceSecurityGroup,
      ec2.Port.tcp(5432),
      'Allow connections from Backend ECS service',
    );

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
          taskRole,
          logDriver: new ecs.AwsLogDriver({
            streamPrefix: 'backend-service-web',
          }),
          environment: {
            TASK_BOARD_APP_DATABASE_HOST: props.db.instanceEndpointAddress,
            TASK_BOARD_APP_DATABASE_USER: props.db.dbUserName,
            TASK_BOARD_APP_DATABASE_NAME: props.db.dbName,
          },
        },
        securityGroups: [fargateServiceSecurityGroup],
      },
    );

    this.imageTagParamaterName = containerImage.tagParameterName;
  }
}
