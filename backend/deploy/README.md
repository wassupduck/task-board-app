# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `yarn build` compile typescript to js
- `yarn watch` watch for changes and compile
- `yarn test` perform the jest unit tests
- `yarn cdk deploy` deploy this stack to your default AWS account/region
- `yarn cdk diff` compare deployed stack with current state
- `yarn cdk synth` emits the synthesized CloudFormation template

## Documentation

### Database Setup

1. Connect to the RDS instance via the bastion host using the master password. See infra/README.md for instructions.
2. Create a new database for the app.

```sql
CREATE DATABASE task_board_app;
```

3. Create a new user to be used by the service.

```sql
-- Create user
CREATE USER task_board_app_user;
-- Grant rds_iam role to use IAM authentication
GRANT rds_iam TO task_board_app_user;
-- Allow user to connect to the app database
GRANT CONNECT ON DATABASE task_board_app TO task_board_app_user;
-- connect to task_board_app database
/c task_board_app
-- Allow new user to "loop up" objects in the public schema
-- and create new objects
GRANT CREATE ON SCHEMA public TO task_board_app_user;
GRANT USAGE ON SCHEMA public TO task_board_app_user;
```

### Deployment

## CDK Context

Typically runtime context values are provided to a CDK app in the projects `cdk.context.json` file or in the `context` key of the projects `cdk.json` file. As this repository is public however this is not desirable as it would leak private AWS account information. Instead stacks in this project are provided context from a Systems Manager parameter that is looked up during synthesis and cached by CDK in the `cdk.context.json` project file. This file is ignored by git and is uncommited.

Two SSM Parameters must be created in the staging AWS account:

- `backend-staging-pipeline-stack-config`
- `backend-service-stack-config`

These parameters must store JSON values in plaintext. The format and expected keys of each can be found in the `staging-pipeline-stack-config.template.json` and `service-stack-config.template.json` respectively.

## Deploy

1. Deploy the `BaseStack` Stack.

   ```bash
   CDK_STAGING_ACCOUNT=$CDK_STAGING_ACCOUNT CDK_STAGING_REGION=$CDK_STAGING_REGION yarn cdk --profile $AWS_PROFILE deploy StagingBackendBaseStack
   ```

2. Deploy the `BackendStagingPipelineStack` stack.

   1. Create a Github access token with `repo` and `admin:repo_hook` scopes. Store this token in AWS Secrets Manager.
   2. Create a Systems Manager parameter named `backend-staging-pipeline-stack-config` with type `String` containing the configuration data for the `StagingPipelineStack` stack. The format and expected keys can be found in `staging-pipeline-stack-config.template.json`. See the `StagingPipelineStack.configFromLookup` method for more details.
   3. Create a Systems Manager parameter named `backend-service-stack-config` with type `String` containing the configuration data for the `ServiceStack` stack. The format and expected keys can be found in `service-stack-config.template.json`. See the `ServiceStack.configFromLookup` method for more details.
   4. Deploy the `BackendStagingPipelineStack` stack.

      ```bash
      CDK_STAGING_ACCOUNT=$CDK_STAGING_ACCOUNT CDK_STAGING_REGION=$CDK_STAGING_REGION yarn cdk --profile $AWS_PROFILE deploy BackendStagingPipelineStack
      ```
