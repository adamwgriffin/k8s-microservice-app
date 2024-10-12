# Create a namespace for dev
load(
  "ext://namespace", 
  "namespace_create",
  "namespace_inject"
)
namespace_create('dev')

k8s_yaml(kustomize('./infra/k8s/overlays/dev'))

# This just gives the ingress-service object a name so it doesn't show up as "uncategorized" in the UI
k8s_resource(
  objects=['ingress-service:ingress'],
  new_name='ingress-service'
)

docker_build(
  'adamwgriffin/auth',
  context='auth',
  dockerfile='auth/Dockerfile',
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
