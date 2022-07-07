import ora from 'ora'
import fs from 'fs-extra'

import { getAllQuestionStatus, getSummary } from '../service/api.mjs'
import { genDescription, genHeader, genRow, genSummary } from './helper.mjs'
import { getRootPath } from '../utils.mjs'
import { getQuestionList } from '../service/index.mjs'

export function genRootFile () {
  const state = ora().start('生成README中...')
  Promise.all([getQuestionList(), getAllQuestionStatus(), getSummary()]).then(res => {
    const [questions, questionStatus, summary] = res
    const str = `
${genDescription()}
${genSummary(summary)}
${genHeader()}${genRow(questions, questionStatus)}
        `.trim()

    fs.writeFile(getRootPath('README.md'), str, err => {
      if (err) {
        console.error(err)
      }
      state.succeed('生成成功!')
    })
  })
}
