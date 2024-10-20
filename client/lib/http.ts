import axios from 'axios'

// Because of SSR, some requests me make will be executed on the server. On the server we need to specify the hostname
// of the Kubernetes service we are making the request to, otherwise the container's localhost will be assumed. Using
// the hostname of our Ingress service is preferred because that way we dont' have to know the name of the specific
// service we're calling, we can just use the routing rules we've already defined. Since ingress-nginx is in a different
// namespace than the rest of our app we have to call it using subdomains of the form
// [service_name].[namespace].svc.cluster.local instead of the short domains we normally use. If we're on the server we
// also have to pass the headers from the orginal request along because they include the "host" header and the cookie we
// need to authenticate some request. We have to use a client like Axios for the request because fetch forbids us to
// modify the "host" header, which causes Nginx to return a 404.
export const createHTTPClient = (headers: Headers) => {
  // If the window object is 'undefined' it means we're on the server
  return typeof window === 'undefined'
    ? axios.create({
        baseURL: process.env.NEXT_PUBLIC_INGRESS_HOSTNAME,
        headers: Object.fromEntries(headers.entries())
      })
    : axios.create({ baseURL: '/' })
}
