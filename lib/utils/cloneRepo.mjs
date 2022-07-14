import download from 'download-git-repo'
import ora from 'ora'
import path from 'path'

const templateRepo = 'direct:https://github.com/LiHowe/lcool-template.git'

function cloneRepo() {
  ora('初始化项目中...').start()
  return new Promise((resolve, reject) => {
    download(templateRepo, path.join(process.cwd(), './leetcode'), { clone: true }, err => {
      console.log(err)
      if (!err) {
        ora('初始化项目完成').succeed()
        resolve()
      } else {
        ora('初始化项目失败').fail()
        reject()
      }
    })
  })
}

cloneRepo()
