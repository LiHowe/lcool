import { Option, Command } from 'commander'
import { generateQuestion } from '@lcool/generator'
import { getTodayQuestion, Question, getQuestionDetail } from '@lcool/api'
import { cache, logger } from '@lcool/utils'

import { createQuestionIndex } from './init'
import ora from 'ora'

export const generate = () => new Command('generate')
  .alias('g')
  .description('生成题目文件')
  .option('--force', '覆盖已有文件')
  .action(generateHandler)
  .addOption(
    new Option('-T --today', '今天题目')
      .conflicts(['all', 'random', 'exact', 'category'])
  )
  .addOption(
    new Option('-E --exact <questionId>', '具体题目, 提供题目编号').conflicts(
      ['all', 'random', 'today', 'category']
    )
  )
  .addOption(
    new Option('-R --random [difficulty]', `
    随机题目, 可指定难度
    e: easy, m: medium, h: hard
    E: m+h, M: e+h, H: e+m
    `)
      .choices(['e', 'm', 'h', 'E', 'M', 'H'])
      .conflicts(['all', 'exact', 'today', 'category'])
  )
  .addOption(
    new Option('-A --all', '生成全部题目').conflicts([
      'exact',
      'random',
      'today',
      'category',
    ])
  )

export interface GenerateOptions {
  today?: boolean
  exact?: string
  random?: DifficultyTag
  all?: boolean
  category?: string
  force?: boolean
}

type DifficultyTag = 'e' | 'm' | 'h' | 'E' | 'M' | 'H'

async function generateHandler({
  today,
  exact,
  random,
  all,
  category,
  force,
}: GenerateOptions) {
  if (!today && !exact && !random && !all) {

    return
  }
  let title
  if (today) title = await handleToday()
  if (!title) {
    logger.error('查询今日题目失败.')
    return
  }
  if (exact) title = await handleExtra(exact)
  if (!title) {
    logger.error(`没有指定题号题目.`)
    return
  }
  if (random) title = await handleRandom(random)
  if (!title) {
    logger.error('生成随机题目失败, 请重试.')
    return
  }
  if (all) return await handleAll({ category, force })
  const [detail] = await getQuestionDetail(title)
  let path
  try {
    path = await generateQuestion(detail)
  } catch (e) {
    logger.error('生成题目失败!')
    return
  }
  ora(`生成题目成功: ${path}`).succeed()
  // ..
}

async function handleRandom(random: GenerateOptions['random']) {
  const allQuestion = await ensureQuestionIndex()
  // TODO
  // ..
}

async function ensureQuestionIndex(retry = 0): Promise<Question[] | null> {
  if (retry >= 3) {
    logger.error('构建题目索引失败')
    return null
  }
  const allQuestion = cache.get('question')
  if (!allQuestion) {
    await createQuestionIndex()
    return ensureQuestionIndex(retry + 1)
  }
  return allQuestion as Question[]
}

async function handleExtra(exact: GenerateOptions['exact']) {
  const allQuestion = await ensureQuestionIndex()
  const question = (allQuestion as Question[]).find(q => q.frontendQuestionId === exact)
  if(!question) {
    ora(`没有找到题目: ${exact}`).fail()
    return null
  }
  return question.titleSlug
}

async function handleToday() {
  const [record] = await getTodayQuestion()
  const { question } = record[0]
  return question.titleSlug
}

async function handleAll({ category, force }: GenerateOptions) {
  // TODO
}
