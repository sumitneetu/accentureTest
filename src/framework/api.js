import http from 'axios'
import { endpoint } from './config'
class API {
  static headers() {
    return {
      'Content-Type': 'application/json',
    }
  }
  static cancleRequest() {
    const cancelTokenSource = axios.CancelToken.source()
    return cancelTokenSource.cancel()
  }
  static get(route, headers, otherHost, key, directCall) {
    return this.api({
      requestType: 'get',
      route,
      headers,
      otherHost,
      key,
      directCall,
    })
  }
  static post(route, headers, params, data, directCall) {
    return this.api({
      requestType: 'post',
      route,
      headers,
      params,
      data,
      directCall,
    })
  }
  static api({
    requestType,
    route,
    headers,
    params,
    data,
    otherHost,
    key,
    directCall = false,
  }) {
    const url = directCall ? route : `${endpoint.BASE_URL}${route}`
    const baseHeaders = API.headers()
    const axiosInstance = http.create({
      baseURL: url,
      headers: headers ? Object.assign({}, baseHeaders, headers) : baseHeaders,
      method: requestType,
      params: params || {},
      data: data || {},
      otherHost,
      key,
    })

    axiosInstance.interceptors.response.use(
      // Return a successful response back to the calling service
      (response) => response,
      // Return any error which is not due to authentication back to the calling service

      (err) => new Promise(this.handleExpireToken({ err }))
    )

    if (requestType === 'get' || requestType === 'delete') {
      console.log('url', url)
      const startTime = window.performance.now()
      return axiosInstance
        .get(url, {})
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          throw err
        })
    }

    const startTime = window.performance.now()
    return axiosInstance
      .post(url, data)
      .then((response) => {
        if (url.includes('guestlogin')) {
          return response
        }
        return response
      })
      .catch((err) => {
        throw err
      })
  }
}

export default API
