import { getPath } from './path.mjs'
import { fs } from './file.mjs'

function getPkgVersion() {
  try {
    const pkgContent = JSON.parse(fs.readFileSync(getPath('package.json'), 'utf-8'))
    console.log(pkgContent)
    return pkgContent.version
  } catch(e) {
    return 'unknown'
  }
}

console.log(getPkgVersion())
