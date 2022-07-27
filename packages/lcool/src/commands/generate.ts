import { program, Option } from 'commander'
import { generateQuestion, generateReadme } from '@lcool/generator'
import { getTodayQuestion, Question } from '@lcool/api'
import { cache, log } from '@lcool/utils'
import prompts from 'prompts'

import { createQuestionIndex } from './init'
import ora from 'ora'

export const generate = () =>
  program
    .command('generate')
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

function generateHandler({
  today,
  exact,
  random,
  all,
  category,
  force,
}: GenerateOptions) {
  let title
  if (today) title = handleToday()
  if (exact) title = handleExtra(exact)
  if (random) title = handleRandom(random)
  if (all) return handleAll({ category, force })
  // ..
}

async function handleRandom(random: GenerateOptions['random']) {
  const allQuestion = await ensureQuestionIndex()
  // TODO
  // ..
}

async function ensureQuestionIndex(retry = 0): Promise<Question[] | null> {
  if (retry >= 3) {
    log.error('构建题目索引失败')
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

function handleAll({ category, force }: GenerateOptions) {
  // TODO
}
