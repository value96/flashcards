import { API_BASE_URL } from '@shared/config/env'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})
