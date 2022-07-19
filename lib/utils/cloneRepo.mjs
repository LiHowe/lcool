import download from 'download-git-repo'
import { cwdPath } from './path.mjs'

const templateRepo = 'direct:https://github.com/LiHowe/lcool-template.git'
export const projectRoot = cwdPath('./leetcode')

export function getRepo() {
  return new Promise((resolve, reject) => {
    download(templateRepo, projectRoot, { clone: true }, err => {
      if (!err) {
        resolve(projectRoot)
      } else {
        reject()
      }
    })
  })
}
