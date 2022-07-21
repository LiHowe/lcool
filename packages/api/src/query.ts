// 查询问题详情
export const queryQuestionData = `
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
`

// 查询全部问题
export const queryAllQuestions = `
query allQuestions {
  allQuestionsBeta {
    ...questionSummaryFields
    __typename
  }
}

fragment questionSummaryFields on QuestionNode {
  title
  titleSlug
  translatedTitle
  questionId
  questionFrontendId
  status
  difficulty
  isPaidOnly
  categoryTitle
  __typename
}
`

// 查询每日一题
export const queryQuestionOfToday = `
query questionOfToday {
  todayRecord {
    question {
      titleSlug
      __typename
    }
    __typename
  }
}
`

// 查询提交记录
export const querySubmissions = `
query submissions($offset: Int!, $limit: Int!, $questionSlug: String!, $lang: String) {
  submissionList(offset: $offset, limit: $limit, questionSlug: $questionSlug, lang: $lang) {
    hasNext
    submissions {
      id
      statusDisplay
      lang
      runtime
      timestamp
      url
      memory
      submissionComment {
        comment
        flagType
      }
    }
  }
}
`

// 更新或删除提交记录(备注, 旗帜颜色)
// flagType: 'WHITE', comment: '' 即为删除
export const updateComment = `
mutation submissionCreateOrUpdateSubmissionComment($submissionId: ID!, $flagType: SubmissionFlagTypeEnum!, $comment: String!) {
  submissionCreateOrUpdateSubmissionComment(comment: $comment, flagType: $flagType, submissionId: $submissionId) {
    ok
    __typename
  }
}
`

// 查询提交记录详情
export const querySubmissionDetail = `
query mySubmissionDetail($id: ID!) {
  submissionDetail(submissionId: $id) {
    id
    code
    runtime
    memory
    lang
    isMine
    sourceUrl
    question {
      titleSlug
      title
      translatedTitle
      questionId
    }
    submissionComment {
      comment
      flagType
    }
  }
}

`
