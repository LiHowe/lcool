import { cacheDir, cacheFile } from './path'
import { mkdir, readToObject, isExist, write, readDirWithStats, remove } from './file'

// cache data to file.
// root folder is .cache
export class Cache {

  init() {
    mkdir(cacheDir)
  }

  get(filename: string) {
    if (!isExist(cacheFile(filename))) return null
    return readToObject(cacheFile(filename))
  }

  set(filename: string, value: Record<string, any> | string) {
    write(cacheFile(filename), value)
  }

  del(filename: string) {
    remove(filename)
  }

  list() {
    return readDirWithStats(cacheDir, [`${cacheDir}/**/*.json`])
  }

}

export const cache = new Cache()
