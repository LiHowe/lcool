import axios from 'axios'
import { getSession } from '../utils/session.mjs'
import { url } from './urls.mjs'
import { logger } from '../utils/logger.mjs'

let sessionId = ''

// cookie 中 LEETCODE_SESSION
let csrftoken = 'Y22WgLaTIdOzatlJMfe01nsc9izwT4MkG7GBgV108WPPLW0xBItnwQ1J0RM9EHhp'

const request = axios.create({
  baseURL: url.base,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.response.use(res => {
  return res.data.data
}, err => {
  logger.error(err)
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
