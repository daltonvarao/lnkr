import axios from 'axios'
import auth from './auth'

const baseURL = '/api'

const api = axios.create({
  baseURL,
})

api.interceptors.request.use(function (config) {
  const token = auth.isAuthenticated()

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

export default api
