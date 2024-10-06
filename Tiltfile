# Modify the ingress host so that it uses "localhost" instead of the domain we intend to use for prod. So far I havn't
# been able to come up with a better way to do this so I resorted to modifying the yml file before having Tilt apply it.
objects = read_yaml_stream('./infra/k8s/ingress-srv.yml')
for o in objects:
  o['spec']['rules'][0]['host'] = 'localhost'
k8s_yaml(encode_yaml_stream(objects))

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

k8s_yaml('./infra/k8s/auth-depl.yml')

docker_build(
  'adamwgriffin/my-nextjs-app-img',
  context='client',
  dockerfile='client/Dockerfile',
  target='builder',
  entrypoint='yarn dev',
  live_update=[
    sync('./client', '/app')
  ]
)

k8s_yaml('./infra/k8s/client-depl.yml')
