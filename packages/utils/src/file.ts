import {
  writeFileSync,
  existsSync,
  ensureDirSync,
  rm,
  readFileSync,
  pathExistsSync,
} from 'fs-extra'
import fg from 'fast-glob'

import { toJSON } from './helpers'

export function write(path: string, content: string | Record<string, any>) {
  if (typeof content !== 'string') content = toJSON(content)
  writeFileSync(path, content, 'utf-8')
}

export function read(path: string) {
  if (!pathExistsSync(path)) return null
  return readFileSync(path, 'utf-8')
}

export function readToObject(path: string): Record<string, any> {
  const content = read(path)
  return content ? JSON.parse(content) : null
}


export function isExist(path: string) {
  return existsSync(path)
}

export function mkdir(path: string) {
  ensureDirSync(path)
}

// if patterns is setting, path will be ignored.
export function readDir(
  path: string,
  patterns: string[] = [`${path}/**/*`]
  ): string[] {
  return fg.sync(patterns)
}

export function readDirWithStats(
  path: string,
  patterns: string[] = [`${path}/**/*`]
) {
  return fg.sync(patterns, { stats: true })
}

export function remove(path: string) {
  rm(path, { recursive: true, force: true })
}
