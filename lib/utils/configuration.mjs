import { getPath } from './index.mjs'
import { Low, JSONFile }  from 'lowdb'
import { logger } from './logger.mjs'

const configFileName = '.lcoolrc.json'

const basicConfig = () => ({
  tag: '@h'
})

let db

export const initDB = () => {
  try {
    const adapter = new JSONFile(getPath(configFileName))
    db = new Low(adapter)
  } catch(e) {
    logger.error({
      level: 'error',
      message: '初始化数据库失败: ' + e.toString(),
    })
  }
}

const getDB = () => {
  if (!db) {
    initDB()
  }
  return db
}

export const getConfig = () => {
  const db = getDB()
  db.read()
  return db.data
}

export const setConfig = (k, v = null) => {
  const db = getDB()
  db.read()
  // k as object
  if (typeof k !== 'string') {
    db.data = {
      ...basicConfig,
      ...k,
    }
  } else {
    db.data[k] = v
  }
  db.write()
}

// TODO: 是否需要验证config的合法性？
