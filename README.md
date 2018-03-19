<div align="center">

# Simple User API with Serverless + TypeScript

[![Build Status](https://travis-ci.org/gyukebox/userapi-sls-ts.svg?branch=master)](https://travis-ci.org/gyukebox/userapi-sls-ts) [![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

</div>

Simple user API using Serverless with Typescript, deployed to AWS Lambda  
Resources are saved to AWS DynamoDB

## Local Development

Since this repo uses Serverless framework, you need to install it. Serverless is available via command line, so with this command you can install the CLI

```
$ yarn global add serverless
```

Then, install all dependency with this command: 
```
$ yarn
```

And you're get to go with further development!

## Dev server, Testing, etc.

Inside `package.json` exist available commands which can be executed via `yarn run`.

To start offline server, you can use:
```
$ sls offline start
```

## Try Remote Access

This sample application is deployed to AWS Lambda: [URL](https://gax3g1mpel.execute-api.ap-northeast-2.amazonaws.com/prod/users)  
You can send request(s) via `cURL` or `httpie`, or just invoke handlers via:

```
$ sls invoke -f <func-name>
```

## API Reference & Postman collection

Available [here](https://documenter.getpostman.com/view/3135479/sample-user-api-with-serverless-typescript/RVnZgxw9)


## WIP
- [ ] Create test environment

## License
MIT
