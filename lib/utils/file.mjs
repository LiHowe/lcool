import fs from 'fs-extra'
import { extname } from 'path'

/**
 *
 * @param path {String} file path
 * @param content {String|Buffer} file content
 * @param onSuccess {Function} success handler
 * @param onError {Function} error handler
 * @param createFolder {Boolean} create folder if path folder not exist
 */
export function writeFile({
  path,
  content,
  onSuccess,
  onError,
  createFolder,
}) {

  const ext = extname(path)
  if (createFolder) {

  }
  try {
    fs.writeFileSync(path, content, {
      encoding: 'utf-8'
    })
    onSuccess && onSuccess(path)
  } catch (e) {
    onError && onError(e)
  }
}
