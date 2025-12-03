import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { LASTFM_BASE_URL, LASTFM_API_KEY } from '@/lib/constants/api'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: LASTFM_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add API key to all requests
    if (config.params) {
      config.params.api_key = LASTFM_API_KEY
      config.params.format = 'json'
    } else {
      config.params = {
        api_key: LASTFM_API_KEY,
        format: 'json',
      }
    }

    return config
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle errors globally
    console.error('[API Response Error]', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    })

    // Customize error messages
    if (error.response?.status === 404) {
      console.error('Resource not found')
    } else if (error.response?.status === 500) {
      console.error('Server error occurred')
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout')
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
