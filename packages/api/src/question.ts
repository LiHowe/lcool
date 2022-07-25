import { request } from './request'
import { URLs } from './urls'
import {
  queryAllQuestions,
  queryQuestionOfToday,
  querySubmissions,
  queryQuestionData,
} from './query'

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

/**
 * 获取问题详情
 * @param titleSlug
 * @returns
 */
export async function getQuestionDetail(titleSlug: string): Promise<Question> {
  return await request.post(URLs.graphql, {
    query: queryQuestionData,
    operationName: 'questionData',
    variables: {
      titleSlug
    }
  })
}

/**
 * 获取问题列表
 */
export async function getAllQuestions(): Promise<Question[]> {
  return await request.post(URLs.graphql, {
    query: queryAllQuestions,
    operationName: 'allQuestions',
    variables: {}
  })
}

// Question of today
export async function getTodayQuestion(): Promise<Pick<Question, 'titleSlug'>> {
  return await request.post(URLs.graphql, {
    query: queryQuestionOfToday,
    operationName: 'questionOfToday',
    variables: {}
  })
}


export async function submitQuestion(titleSlug: string, data: {
  typed_code: string,
  question_id: string,
}): Promise<number> {
  return await request.post(`${URLs.problems}/${titleSlug}/submit/`, {
    ...data,
    questionSlug: titleSlug,
    test_judger: '',
    test_mode: false,
    lang: 'javascript',
  })
}


export interface TestResponse {
  interpret_expected_id: string
  interpret_id: string
  test_case: string
}
export async function testQuestion(titleSlug: string, data: {
  data_input: string,
  typed_code: string,
  question_id: string,
}): Promise<TestResponse> {
  return await request.post(`${URLs.problems}/${titleSlug}/interpret_solution/`, {
    ...data,
    test_judger: '',
    test_mode: false,
    lang: 'javascript',
    judge_type: 'small'
  })
}


export interface CheckResponse {
  state: string
  lang: string
  memory_percentile: number // 内存击败数
  runtime_percentile: number // 执行击败数
  status_runtime: string // 执行用时
  status_memory: string // 内存消耗
  total_correct: number // 正确数
  total_testcases: number // 测试用例数量
}
/**
 * 查看提交状态
 * @param submissionId
 * @returns
 */
export async function checkSubmission(submissionId: number): Promise<CheckResponse | Pick<CheckResponse, 'state'>> {
  return await request.post(`${URLs.submissions}/detail/${submissionId}/check/`)
}


export interface Submission {
  id: string
  statusDisplay: 'Accepted' | 'Wrong Answer'
  lang: string
  runtime: string
  timestamp: string
  url: string
  memory: string
  submissionComment: {
    comment: string
    flagType: string
  } | null
}

/**
 * 获取问题提交记录(支持分页)
 * @param variables
 * @returns
 */
export async function getSubmissions(variables: {
  questionSlug: string,
  offset?: number,
  limit?: number,
  language?: string,
}): Promise<{ hasNext: boolean, submissions: Submission[]}> {
  return await request.post(URLs.graphql, {
    query: querySubmissions,
    operationName: 'submissions',
    variables
  })
}
