import fs from 'fs-extra'

/**
 *
 * @param path {String} file path
 * @param content {String|Buffer} file content
 * @param onSuccess {Function} success handler
 * @param onError {Function} error handler
 * @param createFolder {Boolean} create folder if path folder not exist
 */
function writeFile({
  path,
  content,
  onSuccess,
  onError,
  createFolder,
}) {
  if (createFolder) createDir(path)
  try {
    fs.writeFileSync(path, content, {
      encoding: 'utf-8'
    })
    onSuccess && onSuccess(path)
  } catch (e) {
    onError && onError(e)
  }
}

export function createDir(path) {
  const dir = path.split('/')
  dir.pop()
  const dirPath = dir.join('/')
  fs.ensureDirSync(dirPath)
}

export function removeDir(path, force = false) {
  fs.rmSync(path, {
    recursive: true,
    force
  })
}

export function removeFile(path) {
  fs.rm(path, { force: true })
}

export {
  fs,
  writeFile,
}
