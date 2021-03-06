import { program } from 'commander'
import { resolve } from 'path'
import { shell, readToObject } from '@lcool/utils'

export const version = async () => program.version(await versionHandler())

export async function versionHandler(): Promise<string> {
  const latestVer = await getLatestVersion()
  const localVer = getLocalVersion()
  if (latestVer !== localVer) {
    console.log('new version available:', latestVer)
    console.log('run `npm install -g lcool` to update')
  }
  // ..
  return localVer
}


// use npm info to get latest package info
export async function getLatestVersion() {
  let v = 'unknown'
  const { stdout } = await shell('npm v lcool version')
  if (stdout?.trim()) {
    v = stdout.replace(/\n/g, '')
  }
  return v
}

export function getLocalVersion() {
  const obj = readToObject(resolve(__dirname, '../../package.json'))
  return obj['version']
}
