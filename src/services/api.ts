import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost"
const API_PORT = import.meta.env.VITE_API_PORT || "3000"
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/api/v1"

const baseURL = `${API_URL}:${API_PORT}${API_BASE_PATH}`

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Aqui puedes agregar tokens de autenticacion si es necesario
    // const token = localStorage.getItem("token")
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Manejo global de errores
    // if (error.response?.status === 401) {
    //   // Redirigir a login o refrescar token
    // }
    return Promise.reject(error)
  }
)

export default api
