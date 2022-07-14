import { fs, getPath } from './index.mjs'

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
