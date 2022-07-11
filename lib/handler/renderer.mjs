import ejs from 'ejs'
import fs from 'fs-extra'
import path from 'path'


const template = fs.readFileSync(
  path.resolve('../template/README.ejs'),
  'utf-8'
)

const res = ejs.render(
  template,
  {
    title: 'hahah',
    summary: [{
      total: 100,
      current: 1,
    }]
  }
)

console.log(res)
