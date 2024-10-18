import axios from 'axios'

const createAxiosInstance = (headers: Headers) => {
  if (typeof window === 'undefined') {
    // We are on the server. Since ingress-nginx is in a different namespace than our app we have to call ut using this
    // url instead.
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: Object.fromEntries(headers.entries())
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/'
    })
  }
}

export default createAxiosInstance
