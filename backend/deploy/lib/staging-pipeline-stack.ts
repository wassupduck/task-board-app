import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { ServiceStack } from './service-stack';
import { StagingPipeline } from './staging-pipeline';

interface StagingPipelineStackConfig {
  githubSource: {
    owner: string;
    repo: string;
    branch: string;
    oauthTokenSecretId: string;
  };
}

export interface StagingPipelineStackProps extends cdk.StackProps {
  readonly imageRepo: ecr.IRepository;
  readonly serviceStack: ServiceStack;
}

export class StagingPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StagingPipelineStackProps) {
    super(scope, id, props);

    const config = this.configFromLookup('backend-pipeline-stack-config');

    new StagingPipeline(this, 'StagingPipeline', {
      imageRepo: props.imageRepo,
      serviceStack: props.serviceStack,
      githubSource: config.githubSource,
    });
  }

  // TODO: Refactor
  configFromLookup(ssmParameterName: string): StagingPipelineStackConfig {
    const configString = ssm.StringParameter.valueFromLookup(
      this,
      ssmParameterName,
    );

    if (configString.includes('dummy-value')) {
      // Dummy config, see: https://sdhuang32.github.io/ssm-StringParameter-valueFromLookup-use-cases-and-internal-synth-flow/
      return {
        githubSource: {
          owner: 'github-source-owner',
          repo: 'github-source-repo',
          branch: 'github-source-branch',
          oauthTokenSecretId: 'github-source-oauth-token-secret-id',
        },
      };
    }

    const defaults = {
      githubSource: {
        branch: 'main',
        oauthTokenSecretId: 'github-access-token',
      },
    };

    // TODO: Validation
    const config = JSON.parse(configString);

    // Yuck! - being lazy.
    return {
      ...defaults,
      ...config,
      githubSource: {
        ...defaults.githubSource,
        ...config.githubSource,
      },
    } as StagingPipelineStackConfig;
  }
}
