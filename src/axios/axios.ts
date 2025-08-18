import axios from 'axios'

export function useAxios(url: string, method: string, data: object) {
  return axios({
    baseURL: 'http://localhost',
    url: url,
    method: method,
    data: data,
    withCredentials: true,
    withXSRFToken: true,
  })
}
