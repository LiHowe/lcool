import ejs from 'ejs'
import { fs, getPath, path } from '../utils/index.mjs'
import { README } from '../utils/pathMapping.js'
import prompts from 'prompts'

// const template = fs.readFileSync(
//   path.resolve('../template/README.ejs'),
//   'utf-8'
// )

// const res = ejs.render(
//   template,
//   {
//     title: 'hahah',
//     summary: [{
//       total: 100,
//       current: 1,
//     }]
//   }
// )

function fetchData () {
  // TODO: 获取做题进度
  // TODO: 获取题目列表
}

function readmeRenderer () {
  const exist = fs.existsSync(README)
  if (exist) {
    prompts({
      type: 'confirm',
      name: 'cover',
      message: 'README文件已存在，是否覆盖?'
    }).then(ans => {
      console.log(ans)
    })
  }
  return exist
}

console.log(readmeRenderer(), process.cwd())
