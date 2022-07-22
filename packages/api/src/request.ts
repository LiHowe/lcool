import axios from 'axios'
import { URLs } from './urls'

export const request = axios.create({
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(response => {
  const sc = response.headers['set-cookie']
  if (sc) {
    for (const cookie of sc) {
      if (cookie.includes('csrftoken') || cookie.includes('LEETCODE_SESSION')) {
        const [k, v] = cookie.split('=')
        setCookie(k, v)
      }
    }
  }
  if (response.config.url?.includes('/graphql')) {
    return response.data.data
  }
  // use `data-format: raw` as flag to response raw data
  if (response.headers['data-format'] === 'raw') {
    return response
  }
  return response.data
}, err => {
  console.log(err)
  throw err
})

const cookies: Record<string, string> = {}

function setCookie(k: string, v: string) {
  cookies[k] = v
  request.defaults.headers.common['Cookie'] += `; ${k}=${v}`
}

function getCookie(k: string) {
  return cookies[k] ?? null
}

export async function login({ username, password }: { username: string, password: string }) {
  const params = new URLSearchParams()
  params.append('login', username)
  params.append('password', password)
  params.append('csrfmiddlewaretoken', 'null')
  await request.post(URLs.login, params, {
    headers: {
      Origin: URLs.base,
      Referer: URLs.login,
      Cookie: 'scrftoken=null;',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  return {
    token: getCookie('LEETCODE_SESSION'),
    csrfToken: getCookie('csrftoken'),
  }
}
