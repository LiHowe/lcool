import { request } from './request'
import { URLs } from './urls'
import { queryUserInfo } from './query'

export interface UserStatus {
  avatar?: string
  realName?: string
  username?: string
  userSlug?: string
  isPremium?: boolean
  isSignedIn?: boolean
  useTranslation?: boolean
}

export async function getUserInfo(): Promise<{ userStatus: UserStatus }> {
  return await request.post(URLs.graphql, {
    variables: {},
    query: queryUserInfo
  })
}
