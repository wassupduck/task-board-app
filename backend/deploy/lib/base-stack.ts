import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class BaseStack extends cdk.Stack {
  public readonly imageRepo: ecr.Repository;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.imageRepo = new ecr.Repository(this, 'ImageRepo', {
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
    });
  }
}
