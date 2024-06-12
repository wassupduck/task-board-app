import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as sm from 'aws-cdk-lib/aws-secretsmanager';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as cm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';
import { ArnFormat, Stack } from 'aws-cdk-lib';

export interface ServiceProps {
  readonly vpc: ec2.IVpc;
  readonly ecsCluster: ecs.ICluster;
  readonly imageRepo: ecr.IRepository;
  readonly domainZone?: r53.IHostedZone;
  readonly domainName?: string;
  readonly certificate?: cm.ICertificate;
  readonly db: {
    readonly instanceResourceId: string;
    readonly instanceEndpointAddress: string;
    readonly instanceSecurityGroup: ec2.ISecurityGroup;
    readonly dbName: string;
    readonly dbUser: string;
  };
  readonly jwtSecretSecretArn: string;
  readonly frontendUrl: string;
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
          Stack.of(this).formatArn({
            arnFormat: ArnFormat.COLON_RESOURCE_NAME,
            service: 'rds-db',
            resource: 'dbuser',
            resourceName: [props.db.instanceResourceId, props.db.dbUser].join(
              '/',
            ),
          }),
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
        certificate: props.certificate,
        sslPolicy: elb.SslPolicy.RECOMMENDED,
        domainName: props.domainName,
        domainZone: props.domainZone,
        redirectHTTP: props.certificate !== undefined,
        taskImageOptions: {
          image: containerImage,
          containerPort: 3000,
          taskRole,
          logDriver: new ecs.AwsLogDriver({
            streamPrefix: 'backend-service-web',
          }),
          environment: {
            TASK_BOARD_APP_DATABASE_HOST: props.db.instanceEndpointAddress,
            TASK_BOARD_APP_DATABASE_USER: props.db.dbUser,
            TASK_BOARD_APP_DATABASE_NAME: props.db.dbName,
            TASK_BOARD_APP_FRONTEND_URL: props.frontendUrl,
          },
          secrets: {
            TASK_BOARD_APP_JWT_SECRET: ecs.Secret.fromSecretsManager(
              sm.Secret.fromSecretCompleteArn(
                this,
                'JwtSecretSecret',
                props.jwtSecretSecretArn,
              ),
            ),
          },
        },
        securityGroups: [fargateServiceSecurityGroup],
      },
    );

    this.imageTagParamaterName = containerImage.tagParameterName;
  }
}
