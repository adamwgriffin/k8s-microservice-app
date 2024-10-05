docker_build(
  'adamwgriffin/my-nextjs-app-img',
  context='client',
  dockerfile='client/Dockerfile',
  target='dev',
  entrypoint='yarn dev',
  live_update=[
    sync('./client', '/app')
  ]
)

k8s_yaml('./infra/k8s/client-depl.yml')

k8s_resource('client-depl', port_forwards=3000)
