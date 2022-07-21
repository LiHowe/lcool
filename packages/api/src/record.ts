import { request } from './request'

export function getMonthRecords(year: number, month: number) {
  return request.post(`
    query dailyQuestionRecords($year: Int!, $month: Int!) {
      dailyQuestionRecords(year: $year, month: $month) {
        date
        userStatus
        question {
          questionFrontendId
          title
          titleSlug
          translatedTitle
        }
      }
    }
   `, {
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
  return request.post(`
    query userSessionProgress($userSlug: String!) {
      userProfileUserQuestionProgress(userSlug: $userSlug) {
        numAcceptedQuestions {
          difficulty
          count
        }
        numFailedQuestions {
          difficulty
          count
        }
        numUntouchedQuestions {
          difficulty
          count
        }
      }
    }
  `, {
    variables: { userSlug }
  })
}
