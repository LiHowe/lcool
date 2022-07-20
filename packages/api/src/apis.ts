import axios from 'axios'
import { URLs } from './urls'
import { logger } from '@lcool/utils'

export interface Question {
  acRate: number // 通过率
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' // 困难度
  paidOnly: boolean // 是否是plus专享
  frontendQuestionId: string // 题目ID
  title: string // 标题
  titleCn: string // 中文标题
  titleSlug: string // 处理后的标题
  solutionNum: number // 题解数量
  status: 'AC' | 'TRIED' | 'NOT_START' // 状态
}


export const request = axios.create({
  baseURL: URLs.base,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': URLs.base,
  }
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(response => {
  return response.data.data
})


/**
 * 获取问题详情
 * @param titleSlug
 * @returns
 */
export async function getQuestionDetail(titleSlug: string): Promise<Question> {
  return await request.post(`
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      content
      status
      codeDefinition
      sampleTestCase
      enableRunCode
      metaData
      translatedContent
      isPaidOnly
      questionId
    }
  }
  `, {
    operationName: 'questionData',
    variables: {
      titleSlug
    }
  })
}

/**
 * 获取问题列表
 */
export function getQuestions() {
  // ..
}


export function submitQuestion(question: Question) {
  // ..
}
