import { request } from './request'
import { queryDailyRecord, querySummary } from './query'
import { URLs } from './urls'

export interface DailyRecord {
  date: string // YYYY-MM-DD
  userStatus: 'NOT_START' | 'FINISH'
  question: {
    questionFrontendId: string
    title: string
    titleSlug: string
    translatedTitle: string
  }
}

export async function getMonthRecords(year: number, month: number): Promise<DailyRecord[]> {
  return await request.post(URLs.graphql, {
    query: queryDailyRecord,
    variables: {
      year,
      month,
    }
   })
}

export interface ReportData {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  count: number
}

export interface ReportInfo {
  userProfileUserQuestionProgress: {
    numAcceptedQuestions: ReportData[], // 通过的题目数量
    numFailedQuestions: ReportData[], // 未通过的题目数量
    numUntouchedQuestions: ReportData[], // 未做的题目数量
  }
}

export async function getUserProgress(userSlug: string): Promise<ReportInfo> {
  return await request.post(URLs.graphql, {
    query: querySummary,
    variables: { userSlug }
  }, {
    headers: {}
  })
}
