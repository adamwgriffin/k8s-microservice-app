# K8s Microservice App

A simple example of a Microservice app using Kubernetes with Tilt and Kustomize for development.

## Setup

Note: Typescript files may show errors in your editor since the `node_modules` directory is not intalled locally in the proeject. A basic way to fix this is to install the npm packages so that Typescript can find them. To do this install Yarn globally. You will want to be running it with Node.js 18. After installing the dependencies run `yarn install` inside of each service that is written in Typescript.

Get Docker Desktop and make sure to turn on the Kubernetes in the settings for the app.

Use infra/k8s/overlays/dev/env.app-secret.example to create a file called ".env.app-secret" in order to use it for your app secrets in development.

Generate the secret to use with JWT.
```
openssl rand -base64 32
```
Add the secret to the JWT_SECRET environment variable in your .env.app-secret file.
```
JWT_SECRET=string_generated_by_openssl
```

Install the latest versions of Helm (for use in the Tiltfile with Ingress Nginx) and Kustomize (The version that comes with Kubernetes may not support the features used in the project).

Install Tilt. Then run `tilt up` to apply the Kubernetes resources, build and then run all the containers.

Visit the client at [localhost:3000](http://localhost:3000/)
