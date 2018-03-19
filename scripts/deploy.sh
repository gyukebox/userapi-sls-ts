#!/usr/bin/env bash
# Installation
echo '$ yarn global add serverless && yarn install'
yarn global add serverless
yarn install

# Deployment
echo 'Setting AWS credentials...'
sls config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY
echo 'Deploying...'
sls deploy --verbose

# System test
echo 'System information : '
sls info
echo 'System Testing...'
sls invoke -f retrieveAll