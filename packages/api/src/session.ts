import { request } from './request'
import { URLs } from './urls'

export async function getSession() {
  return await request.post(URLs.session)
}

export function createSession() {
  // TODO
}

export function activateSession() {
  // TODO
}

export function deleteSession() {
  // TODO
}
