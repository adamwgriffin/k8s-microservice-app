k8s_yaml(kustomize('./infra/k8s/overlays/dev'))

k8s_resource('auth-mongo-depl', port_forwards=27017)

docker_build(
  'adamwgriffin/auth',
  context='auth',
  dockerfile='auth/Dockerfile',
  entrypoint='yarn dev',
  live_update=[
    sync('./auth', '/app')
  ]
)

docker_build(
  'adamwgriffin/client',
  context='client',
  dockerfile='client/Dockerfile',
  target='builder',
  entrypoint='yarn dev',
  live_update=[
    sync('./client', '/app')
  ]
)

# Docs: https://github.com/tilt-dev/tilt-extensions/tree/master/helm_resource
load('ext://helm_resource', 'helm_resource', 'helm_repo')
helm_repo('ingress-nginx-repo', 'https://kubernetes.github.io/ingress-nginx')
helm_resource(
  'Ingress Nginx Controller',
  'ingress-nginx-repo/ingress-nginx',
  release_name='ingress-nginx',
  namespace='ingress-nginx',
  # Ingress Nginx runs on port 80 by default but the client dev server's default port is 3000. Setting this just allows
  # things to work correctly when the client needs to do things like redirect the request from the backend.
  port_forwards=['3000:80'],
  resource_deps=['ingress-nginx-repo', 'client-depl']
)
