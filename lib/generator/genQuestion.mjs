import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import dayjs from 'dayjs'

import { getQuestionDetail, getTodayQuestion } from '../service/api.mjs'
import { escapeString } from '../utils.mjs'
import { getQuestionList } from '../service/index.mjs'
import { getConfig } from '../configuration.mjs'

export async function genQuestionFile(question) {
  const tag = getConfig('tag')
  const {
    questionFrontendId,
    titleSlug,
    translatedTitle,
  } = question
  const fileName = `.${path.sep}leetcode${path.sep}${questionFrontendId}.${translatedTitle}.js`

  return {
    next: async () => {
      const o = ora().start('生成中...')
      const detail = await getQuestionDetail(titleSlug)
      const {
        translatedContent,
        codeSnippets = [],
        difficulty,
        questionFrontendId,
        stats,
        title,
        translatedTitle,
        topicTags,
      } = detail
      const targetSnippet = codeSnippets.find(s => s.langSlug === 'javascript')
      const statsObj = JSON.parse(stats)
      const template = `
/*
${tag} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
序号: ${questionFrontendId}
名称: ${translatedTitle} | ${title}
难度: ${difficulty}
标签: ${topicTags ? topicTags.map(i => i.translatedName).join(' | ') : '无'}
链接: https://leetcode-cn.com/problems/${titleSlug}
题解: https://leetcode-cn.com/problems/${titleSlug}/solution/

| 通过数量 | 总提交数 | 通过率 |
| ${statsObj.totalAccepted} | ${statsObj.totalSubmission} | ${statsObj.acRate} |

${escapeString(
  translatedContent
    .replaceAll(/\<\/?\w+\>/g, '')
    .replaceAll('\n \n', '')
    .replaceAll(' ', ' ')
  )
}

*/

const { test } = require('./utils')
// ${tag} code-start
${targetSnippet.code}
// ${tag} code-end
      `.trim()
      fs.writeFileSync(fileName, template, { encoding: 'utf-8' })
      o.succeed(`文件 ${fileName} 生成成功!`)
    },
    exist: fs.existsSync(fileName),
    fileName
  }
}

/**
 * 生成具体题目
 * @param {String} id 题目ID
 */
export async function genExact(id) {
  if (!id) {
    ora('请提供题目ID!').fail()
    return
  }
  const questionResult = await getQuestionList()
  const target = questionResult.find(q => q.questionFrontendId === id || q.questionId === id)
  if (!target) {
    ora.error(`${id} 未找到!`)
    return Promise.reject(`${id} 未找到!`)
  }
  return await genQuestionFile(target)
}

export async function genToday() {
  const arr = await getTodayQuestion()
  const {
    question,
  } = arr[0]
  const {
    titleSlug,
    frontendQuestionId: questionFrontendId,
    titleCn: translatedTitle
  } = question
  return await genQuestionFile({
    titleSlug,
    questionFrontendId,
    translatedTitle
  })
}
