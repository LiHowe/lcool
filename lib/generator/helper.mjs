import { QUESTION_STATUS_1 } from '../variables.mjs'
import dayjs from 'dayjs'
import {
  genBold,
  genTableHeader,
  genTableRowByArr,
  genTitle
} from './md-helper.mjs'

const diffEmoji = {
  'Easy': '🤩 简单',
  'Medium': '🤔 一般',
  'Hard': '🤯 困难'
}

const stateEmoji = {
  [QUESTION_STATUS_1.AC]: '✅',
  [QUESTION_STATUS_1.TRIED]: '🆖',
  [QUESTION_STATUS_1.NOT_STARTED]: '🕐',
}

function genRow (arr = [], statusArr = []) {
  return arr.map((q, i) => {
    const { questionId, questionFrontendId, title, translatedTitle, titleSlug, difficulty } = q
    const status = arr[i].status || statusArr[i].status
    const t = `[${title}](https://leetcode-cn.com/problems/${titleSlug})`
    return genTableRowByArr([questionFrontendId, t, diffEmoji[difficulty], stateEmoji[status]])
  }).join('')
}

function genHeader () {
  return genTitle(2, 'Progress')
  + genTableHeader(['序号', '名称', '&nbsp;难度&nbsp;', '状态'])
}

function genSummary(summary) {
  const {
    numAcceptedQuestions: p,
    numFailedQuestions: f,
    numUntouchedQuestions: n,
  } = summary
  return genTitle(2, 'Summary')
  + genTableHeader([diffEmoji.Easy, diffEmoji.Medium, diffEmoji.Hard])
  + genTableRowByArr([
      `${p[0].count}/${genBold(p[0].count + f[0].count + n[0].count)}`,
      `${p[1].count}/${genBold(p[1].count + f[1].count + n[1].count)}`,
      `${p[2].count}/${genBold(p[2].count + f[2].count + n[2].count)}`
    ])
}

function genDescription() {
  return `
# LeetCode 

My LeetCode Repo.

Update time: ${dayjs().format('YYYY-MM-DD(ddd) HH:mm:ss')}
  `
}

// TODO: 类似github的提交率
function genDashboard () {

}

// TODO: 生成全部题目
// async function genProgress(force = false) {
//   const questions = await getAllQuestions()
//   let skipped = 0, succeed = 0, failed = 0
//   for (let q of questions) {
//     try {
//       const { next, fileName, exist } = await genQuestionFile(q)
//       if (exist && force) {
//         await next()
//         succeed++
//       } else {
//         skipped++
//       }
//     } catch(e) {
//       failed++
//     }
//   }
//   return {
//     skipped,
//     failed,
//     succeed
//   }
// }


export {
  genDescription,
  genSummary,
  genRow,
  genHeader,
}
