import axios from 'axios'
import { StorageKey } from '../type';
import { memoizedAccessTokenRefresh } from "./refreshAccessToken"

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(
  async (config: any) => {
    const authTokens = JSON.parse(
      localStorage.getItem(StorageKey.AuthTokens) ?? '')

    if (authTokens?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${authTokens?.accessToken}`,
      }
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true

      const result = await memoizedAccessTokenRefresh()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        }
      }

      return axios(config)
    }
    return Promise.reject(error)
  }
)

export const axiosOAuth = axios