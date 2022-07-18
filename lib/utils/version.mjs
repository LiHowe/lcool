import { getPath } from './path.mjs'
import { fs } from './file.mjs'

export function getPkgVersion() {
  try {
    const pkgContent = JSON.parse(fs.readFileSync(getPath('package.json'), 'utf-8'))
    return 'v' + pkgContent.version
  } catch(e) {
    return 'unknown'
  }
}
