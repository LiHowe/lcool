import { pkgPath } from './path.mjs'
import { fs } from './file.mjs'

export function getPkgVersion() {
  try {
    const pkgContent = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    return 'v' + pkgContent.version
  } catch(e) {
    return 'unknown'
  }
}
