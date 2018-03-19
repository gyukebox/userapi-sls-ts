#!/usr/bin/env bash
# Installation
echo 'Installing dependencies...'
yarn global add serverless
yarn install

# Testing
echo 'Testing...'
yarn test

# TODO log test results
