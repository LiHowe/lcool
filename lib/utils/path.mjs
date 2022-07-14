import path from 'path'

export function getPath(...p) {
  return path.resolve(process.cwd(), ...p)
}

export const root = getPath()
export const README = getPath('README.md')
export const logRoot = getPath('.log')
export const logDebug = getPath(logRoot, 'debug.log')

export const tempRoot = getPath('.temp')
export const session = getPath(tempRoot, 'session.json')
