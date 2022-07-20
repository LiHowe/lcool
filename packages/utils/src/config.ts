import nconf from 'nconf'
import { configFile } from './path'

interface IConfig {
  endpoint: 'us' | 'cn'
}

export const config_default: IConfig = {
  endpoint: 'cn'
}

export class Config {
  private _config: IConfig

  constructor() {
    this._config = nconf.get('config') || config_default
  }

  init() {
    // global config field
    nconf
      .file('global', configFile)
      .add('default', {
        type: 'literal',
        store: config_default
      })

    this._config = nconf.get()
  }

  set(key: string, value: string) {
    nconf.set(key, value)
  }

  get(key: string) {
    return nconf.get(key)
  }
}

export const config = new Config()
