import { request } from './request'

export function getUserInfo() {
  return request.post(`
    query globalData {
      userStatus {
        isSignedIn
        isPremium
        username
        realName
        avatar
        userSlug
        useTranslation
      }
    }
  `, {
    variables: {}
  })
}
