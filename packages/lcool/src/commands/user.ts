import { program } from 'commander'
import prompts from 'prompts'
import { login, getUserInfo, UserStatus, setSessionId } from '@lcool/api'
import { log, cache } from '@lcool/utils'
import ora from 'ora'

export const user = () => program
.command('user')
.option('-l --login', '登录')
.action(userHandler)

export interface UserInfo extends UserStatus{
  username?: string
  token?: string
  csrfToken?: string
}

async function userHandler() {
  const type = await loginType()
  const fn: Record<LoginType,() => Promise<unknown>> = {
    account: accountLogin,
    cookie: cookieLogin
  }
  await fn[type]()
}

function cacheUser(user: UserInfo) {
  cache.set('user', user)
  return user
}

async function loginForm() {
  return await prompts([
    {
      type: 'text',
      message: 'username:',
      name: 'username',
      validate: val => val.length > 0 ? true : '请输入用户名'
    },
    {
      type: 'password',
      message: 'password:',
      name: 'password',
      validate: val => val.length > 0 ? true : '请输入密码'
    }
  ])
}

async function cookieForm() {
  return (await prompts([
    {
      type: 'text',
      message: '请输入LeetCode Cookie Token',
      name: 'cookie',
      validate: val => val.length > 0 ? true : '请输入Cookie Token'
    }
  ])).cookie
}

type LoginType = 'account' | 'cookie'

async function loginType(): Promise<LoginType> {
  return (await prompts([
    {
      type: 'select',
      message: '',
      name: 'loginType',
      choices: [
        { title: '用户名密码登录', value: 'account' },
        { title: 'Cookie登录', value: 'cookie' },
      ]
    }
  ])).loginType
}

export async function accountLogin() {
  const { username, password } = await loginForm()
  if (!username || !password) return
  console.log({ username, password })
  const spin = ora('登录中...').start()
  try {
    const { token, csrfToken } = await login({username, password})
    const { username: name } = await cacheUserInfo({ username, token, csrfToken })
    spin.succeed('登录成功:' + name)
  } catch (e) {
    spin.fail('登录失败')
    log.error('Request Error: login' + e)
  }
}

async function cookieLogin() {
  // get cookie
  const cookie = await cookieForm()
  if (!cookie) return
  // set cookie to request header
  setSessionId(cookie)
  await cacheUserInfo({ token: cookie })
}

/**
 * Use current SessionId to request user info.
 * @param user
 * @returns
 */
async function cacheUserInfo(user: UserInfo) {
  try {
    const { userStatus } = await getUserInfo()
    return cacheUser({
      ...userStatus,
      ...user,
    })
  } catch (e) {
    log.error('Cache User Error: ' + e)
    return {}
  }
}
