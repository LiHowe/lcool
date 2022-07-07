import fs from 'fs-extra'
import { getRootPath } from './utils.mjs'

const configFileName = 'lc-config.json'

const basicConfig = () => ({
  root: './leetcode',
  tag: '@h'
})

let config = basicConfig()

/**
 *
 * @param key {string} attr
 * @return {{}}
 */
function getConfig(key) {
  const configPath = getRootPath(configFileName)
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, { encoding: 'utf-8' }) || '{}'
    config = Object.assign({}, config, JSON.parse(content))
  }
  return key ? config[key] : config
}

// TODO: write lc-config.json
function writeConfig() {

}

export {
  writeConfig,
  getConfig
}
