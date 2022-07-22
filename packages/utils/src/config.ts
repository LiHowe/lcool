import nconf from 'nconf'
import { configFile } from './path'

interface IConfig {
  endpoint: 'us' | 'cn'
}

export const config_default: IConfig = {
  endpoint: 'cn'
}

export class Config {
  _config: IConfig

  constructor() {
    this._config = nconf.get('config') || config_default
  }

  init() {
    // global config field
    nconf
      .file('global', configFile) // global config file
      .add('default', { // default config
        type: 'literal',
        store: config_default
      })

    this._config = nconf.get()
  }

  set(obj: Record<string, unknown>): void
  set(key: string, value: string): void
  set(key: string | Record<string, unknown>, value?: string) {
    if (typeof key === 'string') {
      nconf.set(key, value)
    } else {
      for (const [k, v] of Object.entries(key)) {
        nconf.set(k, v)
      }
    }
  }

  get(key?: string) {
    return nconf.get(key)
  }

}

export const config = new Config()
