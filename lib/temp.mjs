import fs from 'fs-extra'
import path from 'path'
import { toJSON } from './utils.mjs'

const TEMP_FILE_MAPPING = {
  Session: 'session.json',
  Question: 'question.json'
}

let tempObjCache = new Map()

function getTempFilePath(fileName = '') {
  return path.resolve(process.cwd(), '.temp/', fileName)
}

/**
 * write value to file
 * @param file {TEMP_FILE_MAPPING}
 * @param key {string}
 * @param value {string | number | object}
 */
function setTemp(file, key, value) {
  if (!file) return
  const target = getTemp(file)
  if (!target[key]) {
    Object.assign(target, { [key]: value })
  } else {
    target[key] = Object.assign(target[key], value)
  }
  writeToTemp(file, toJSON(target))
}

function writeToTemp(file, value) {
  const filePath = getTempFilePath(file)
  try {
    if (!fs.existsSync(filePath)) {
      fs.createFileSync(filePath)
    }
    fs.writeFileSync(getTempFilePath(file), value)
    tempObjCache.set(file, value)
  } catch (e) {

  }
}

/**
 * Get value from temp file
 * @param key {string}
 * @param file {TEMP_FILE_MAPPING}
 * @return {any}
 */
function getTemp(file, key= '') {
  if (!file) return null
  const filePath = getTempFilePath(file)
  let contentObject
  if (!tempObjCache.has(file)) {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath) || 'null'
    contentObject = JSON.parse(content)
  } else {
    contentObject = tempObjCache.get(file)
  }
  return key ? contentObject[key] || null : contentObject
}


export {
  TEMP_FILE_MAPPING,
  setTemp,
  getTemp,
  writeToTemp
}
