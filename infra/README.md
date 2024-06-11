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

### Deployment

1. Bootstrap your environment by following the instruction [here](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).
2. Deploy all stacks.
   `CDK_STAGING_ACCOUNT=$CDK_STAGING_ACCOUNT CDK_STAGING_REGION=$CDK_STAGING_REGION yarn cdk --profile $AWS_PROFILE deploy --all`

### Bastion Host

#### Connect to bastion host

Steps to connect to the basion host:

1.  Get the bastion instance ID.
2.  Upload your public key to the instance metadata of the bastion host. After the key is uploaded, you have 60 seconds to start a connection with the bastion host. After 60 seconds, the public key is removed.
    - Send the SSH key to the bastion host by using EC2 Instance Connect. Enter the following command, where: `$INSTANCE_ID` is the ID of the EC2 instance and `$PUBLIC_KEY_FILE` is the path to your public key file, such as my_key.pub. Important: Be sure to use the public key and not the private key.
      ```sh
      aws --profile $AWS_PROFILE ec2-instance-connect send-ssh-public-key \
          --instance-id $INSTANCE_ID \
          --instance-os-user ec2-user \
          --ssh-public-key file://$PUBLIC_KEY_FILE
      ```
3.  Enter the following command to connect to the bastion host through Session Manager, where: `$PRIVATE_KEY_FILE` is the path to your private key, such as my_key and `$INSTANCE_ID` is the ID of the EC2 instance.
    ```sh
    AWS_PROFILE=$AWS_PROFILE ssh -i $PRIVATE_KEY_FILE ec2-user@$INSTANCE_ID
    ```

See https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/access-a-bastion-host-by-using-session-manager-and-amazon-ec2-instance-connect.html for more details.

#### Connect to RDS instance via bastion host

1. Get the bastion instance ID.
2. Get the RDS instance endpoint.
3. Get the RDS instance master user password.
4. Create SSH tunnel. Enter the following command, where: `$INSTANCE_ID` is the ID of the bastion instance, `$RDS_INSTANCE_ENDPOINT` is the endpoint of the RDS instance, and `$PUBLIC_KEY_FILE` is the path to your public key file, such as my_key.pub. Important: Be sure to use the public key and not the private key.
   ```sh
   AWS_PROFILE=$AWS_PROFILE ssh -N -i $PUBLIC_KEY_FILE ec2-user@$INSTANCE_ID -L 5432:$RDS_INSTANCE_ENDPOINT:5432
   ```
5. Connect to postgres. When prompted for a password, enter the master user password.
   ```sh
   psql -h 127.0.0.1 -p 5432 -U postgres
   ```
