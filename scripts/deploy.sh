#!/usr/bin/env bash
# Installation
yarn global add serverless
yarn install

# Deployment
sls config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY
sls deploy