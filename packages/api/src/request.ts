import axios from 'axios'
import { URLs } from './urls'

export const request = axios.create({
  baseURL: '',
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': URLs.base,
  }
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(response => {
  return response.data.data
})

export function setUserToken(token: string) {
  request.defaults.headers.common['Cookie'] += `; LEETCODE_SESSION=${token}`
}

export function setCSRFToken(token: string) {
  request.defaults.headers.common['X-CSRFToken'] = token
  request.defaults.headers.common['Cookie'] += `; csrftoken=${token};`
}
