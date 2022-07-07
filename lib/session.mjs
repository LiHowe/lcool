import { getTemp, setTemp, TEMP_FILE_MAPPING } from './temp.mjs'
import ora from 'ora'

const user = {
  sessionId: null
}

const fileName = TEMP_FILE_MAPPING.Session

export function getSession() {
  if (!user || !user.sessionId) {
    user.sessionId = getTemp(fileName, 'sessionId')
  }
  return user.sessionId
}

export function sessionLogin(session) {
  let p = ora()
  try {
    setTemp(fileName, 'sessionId', session)
    p.succeed('登录成功!')
  } catch(e) {
    p.fail('登录失败!' + e.toString())
    throw new Error(e)
  }
}
