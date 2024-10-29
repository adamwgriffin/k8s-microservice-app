# K8s Microservice App

A simple example of a Microservice app using Kubernetes with Tilt and Kustomize for development.

## Setup

In order to get type safety in the Typescript apps install Yarn globally, then run `yarn install` inside both the auth
and client directories.

Get Docker Desktop and make sure to turn on the Kubernetes in the settings for the app.

Rename infra/k8s/overlays/dev/env.app-secret.example to ".env.app-secret" in order to use it for your app secrets in development.

Generate the secret to use with JWT.
```
openssl rand -base64 32
```
Add the secret to the JWT_SECRET environment variable in your .env.app-secret file.
```
JWT_SECRET=string_generated_by_openssl
```

Install Tilt. Then run `tilt up` to build and run all the containers.
