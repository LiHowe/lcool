import fs from 'fs-extra'
import prompts from 'prompts'
import path from 'path'

import { genExact, genRootFile, genToday } from '../generator/index.mjs'
import { getNotStartedQuestions } from '../service/index.mjs'
import { sessionLogin } from '../utils/session.mjs'

export { handleInit } from './initHandler.mjs'

export function handleUpdateProgress () {
  genRootFile()
}

export function handleSessionLogin (session) {
  sessionLogin(session)
}

async function getRandomQuestionId(difficulty) {
  const arr = await getNotStartedQuestions(q => {
    return q.difficulty.toLowerCase() === difficulty.toLowerCase()
  })
  const idx = Math.floor(Math.random() * arr.length)
  return arr[idx].questionId
}

export async function handleGenerate({
  today,
  exact,
  all,
  force,
  random,
}) {
  if (all) {
    await handleGenerateAllQuestion()
  } else {
    let { exist, next, fileName } = today
      ? await genToday()
      : await genExact(exact || await getRandomQuestionId(random))
    if (!force && exist) {
      const { go } = await prompts({
        type: 'confirm',
        name: 'go',
        message: `文件 ${fileName} 已经存在, 是否覆盖?`,
        initial: false
      })
      if (go) {
        await next()
      }
    } else {
      await next()
    }
  }
}

// TODO: 生成全部题目文件
async function handleGenerateAllQuestion() {
  // const o = ora().start('生成中...')
  // const { skipped, succeed, failed } = await genAll(force)
  // o.end(`生成完成! 成功: ${succeed}, 失败: ${failed}, 跳过: ${skipped}`)
}


/**
 * TODO: 清理空白题目文件
 */
export async function handleClean() {
  const folder = path.resolve(process.cwd(), './leetcode')
  const dirs = fs.readdirSync(folder)
  for (let file of dirs) {
    const content = fs.readFileSync(path.resolve(folder, file), 'utf-8')
    console.log(content)
  }
  console.log(dirs)
}
