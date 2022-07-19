import { getPath } from './path.mjs'
import { Low, JSONFile }  from 'lowdb'

export const configFileName = '.lcoolrc.json'
const defaultConfigPath = getPath(configFileName)
export class Config {
  data = {}
  db = null

  static FileName = '.lcoolrc.json'

  constructor(config = {}) {
    this.data = {
      tag: '@h',
      configFile: Config.FileName,
      ...config
    }
  }

  init(path = defaultConfigPath) {
    const adapter = new JSONFile(path)
    this.db = new Low(adapter)
    return this
  }

  get(key = null) {
    if (!key) return this._data()
    return this._data()[key]
  }

  set(key, value) {
    this._data()[key] = value
    this.db.write()
  }

  cover(config) {
    this.data = { ...this.data, ...config }
  }

  _data() {
    if(!this.db) { this.init() }
    this.db.read()
    return this.db.data
  }
}

export default new Config()
