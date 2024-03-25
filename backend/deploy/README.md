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

### CDK Context

Typically runtime context values are provided to a CDK app in the projects `cdk.context.json` file or in the `context` key of the projects `cdk.json` file. As this repository is public however this is not desirable as it would leak private AWS account information. Instead stacks in this project are provided context from a Systems Manager parameter that is looked up during synthesis and cached by CDK in the `cdk.context.json` project file. This file is ignored by git and is uncommited.

Two SSM Parameters must be created in the staging AWS account:

- `backend-pipeline-stack-config`
- `backend-service-stack-config`

These parameters must store JSON values in plaintext. The format and expected keys of each can be found in the `staging-pipeline-stack-config.template.json` and `service-stack-config.template.json` respectively.

## TODO

- Document database and database user creation steps.
