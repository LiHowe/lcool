import path from 'path'

export const homeDir = process.env.HOME || process.env.USERPROFILE

export function cwdPath(...p) {
  return path.join(process.cwd(), ...p)
}

export function getPath(...p) {
  return path.resolve(homeDir, '.lcool', ...p)
}

export const root = getPath()
export const pkgPath = getPath('package.json')
export const README = getPath('README.md')
export const logRoot = getPath('.log')
export const logDebug = getPath(logRoot, 'debug.log')

export const tempRoot = getPath('.temp')
export const session = getPath(tempRoot, 'session.json')


