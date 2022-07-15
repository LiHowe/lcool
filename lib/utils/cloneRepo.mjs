import download from 'download-git-repo'
import ora from 'ora'
import path from 'path'

const templateRepo = 'direct:https://github.com/LiHowe/lcool-template.git'
export const projectRoot = path.join(process.cwd(), './leetcode')

export function getRepo() {
  const start = ora('初始化项目中...').start()
  return new Promise((resolve, reject) => {
    download(templateRepo, projectRoot, { clone: true },err => {
      start.stop()
      if (!err) {
        ora('初始化项目完成').succeed()
        resolve(projectRoot)
      } else {
        ora('初始化项目失败: ' + err).fail()
        reject()
      }
    })
  })
}
