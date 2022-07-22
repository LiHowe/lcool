import { request } from './request'
import { queryDailyRecord, querySummary } from './query'
import { URLs } from './urls'

export function getMonthRecords(year: number, month: number) {
  return request.post(URLs.graphql, {
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

export function getReportData(userSlug: string): Promise<ReportInfo> {
  return request.post(URLs.graphql, {
    query: querySummary,
    variables: { userSlug }
  })
}
