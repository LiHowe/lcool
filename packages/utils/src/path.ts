import { join } from 'path'

export const cwd = process.cwd()
export const homeDir = process.env['HOME'] || process.env['USERPROFILE'] || cwd

export const appDir = join(homeDir, '.lcool')

// leetcode-cli path
export const lcRoot = join(homeDir, '.lc')
export const lcCodeDir = join(lcRoot, 'leetcode', 'cache')
export const lcCodeDir_cn = join(lcRoot, 'leetcode.cn', 'cache')


export const configFile = join(homeDir, 'config.json')

export const logDir = join(appDir, '.log')
export const logFile = (level: 'error' | 'debug') => join(logDir, `${level}.log`)

export const cacheDir = join(appDir, '.cache')
export const cacheFile = (...args: string[]) => join(cacheDir, ...args)
