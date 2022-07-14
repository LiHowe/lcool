import { getPath } from './index.mjs'

export const root = getPath()
export const README = getPath('README.md')
export const logRoot = getPath('.log')
export const logDebug = getPath(logRoot, 'debug.log')

export const tempRoot = getPath('.temp')
export const session = getPath(tempRoot, 'session.json')
