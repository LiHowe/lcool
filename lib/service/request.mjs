import axios from 'axios'
import { getSession } from '../utils/session.mjs'

let sessionId = ''

// cookie 中 LEETCODE_SESSION
let csrftoken = 'Y22WgLaTIdOzatlJMfe01nsc9izwT4MkG7GBgV108WPPLW0xBItnwQ1J0RM9EHhp'

const request = axios.create({
  baseURL: 'https://leetcode-cn.com/graphql',
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.response.use(res => {
  return res.data.data
}, err => {
  console.error(err)
})

request.interceptors.request.use(conf => {
  if (!sessionId) {
    try {
      sessionId = getSession('sessionId')
    } catch (e) {
      throw new Error('Please run "login" first')
    }
  }
  conf.headers.Cookie = `LEETCODE_SESSION=${sessionId};csrftoken=${csrftoken}`
  conf.headers['X-CSRFToken'] = csrftoken
  return conf
})

export default request
