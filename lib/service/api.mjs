import axios from 'axios'
import { getSession } from '../session.mjs'

let sessionId = ''

// cookie 中 LEETCODE_SESSION
let csrftoken = 'Y22WgLaTIdOzatlJMfe01nsc9izwT4MkG7GBgV108WPPLW0xBItnwQ1J0RM9EHhp'

const request = axios.create({
  baseURL: 'https://leetcode-cn.com/graphql',
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.response.use(res => {
  return res.data.data
}, err => {
  console.error(err)
})

request.interceptors.request.use(conf => {
  if (!sessionId) {
    try {
      sessionId = getSession('sessionId')
    } catch (e) {
      throw new Error('Please run "login" first')
    }
  }
  conf.headers.Cookie = `LEETCODE_SESSION=${sessionId};csrftoken=${csrftoken}`
  conf.headers['X-CSRFToken'] = csrftoken
  return conf
})


async function req (query, key) {
  const res = await request.post(
    '',
    query
  )
  return res[key]
}

export async function getUserInfo() {
  const res = await request.post(
    'https://leetcode-cn.com/graphql/noj-go',
    {
      operationName: "userStatusGlobal",
      query: "query userStatusGlobal {\n  userStatus {\n    isSignedIn\n    isAdmin\n    isStaff\n    isSuperuser\n    isTranslator\n    isVerified\n    isPhoneVerified\n    isWechatVerified\n    checkedInToday\n    username\n    realName\n    userSlug\n    groups\n    avatar\n    optedIn\n    requestRegion\n    region\n    socketToken\n    activeSessionId\n    permissions\n    completedFeatureGuides\n    useTranslation\n    accountStatus {\n      isFrozen\n      inactiveAfter\n      __typename\n    }\n    __typename\n  }\n}\n",
      variables: {}
    }
  )
  return res.userStatus
}

/**
 * filters:
 * status: 'AC' | 'TRIED' | 'NOT_STARTED'
 */
export async function getQuestions({start = 0, end = 100, filters = {}}) {
  return await req(
    {
      query: `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
          problemsetQuestionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
          ) {
            hasMore
            total
            questions {
              acRate
              difficulty
              freqBar
              frontendQuestionId
              isFavor
              paidOnly
              solutionNum
              status
              title
              titleCn
              titleSlug
              topicTags {
                name
                nameTranslated
                id
                slug
              }
              extra {
                hasVideoSolution
                topCompanyTags {
                  imgUrl
                  slug
                  numSubscribed
                }
              }
            }
          }
        }
      `,
      variables: { categorySlug: "", skip: start, limit: end, filters }
    },
    'problemsetQuestionList'
  )
}

export async function getAllQuestions() {
  return await req(
    {
      operationName: "allQuestions",
      query: `
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
      `,
      variables: {}
    },
    'allQuestionsBeta'
  )
}

/**
 * 获取全部题目状态
 * @returns {Promise< Array<{ questionId: string, status: QuestionStatus }> >}
 */
export async function getAllQuestionStatus() {
  return await req(
    {
      operationName: 'allQuestionsStatuses',
      query: `
        query allQuestionsStatuses {
          allQuestionsBeta {
            ...questionStatusFields
            __typename
          }
        }
        
        fragment questionStatusFields on QuestionNode {
          questionId
          status
          __typename
        }
      `,
      variables: {}
    },
    'allQuestionsBeta'
  )
}

/**
 * 获取问题详情
 * @param title
 * @return {Promise<Question>}
 */
export async function getQuestionDetail(title) {
  return await req(
    {
      operationName: "questionData",
      query: `
        query questionData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            questionFrontendId
            categoryTitle
            boundTopicId
            title
            titleSlug
            content
            translatedTitle
            translatedContent
            isPaidOnly
            difficulty
            likes
            dislikes
            isLiked
            similarQuestions
            contributors {
              username
              profileUrl
              avatarUrl
              __typename
            }
            langToValidPlayground
            topicTags {
              name
              slug
              translatedName
              __typename
            }
            companyTagStats
            codeSnippets {
              lang
              langSlug
              code
              __typename
            }
            stats
            hints
            solution {
              id
              canSeeDetail
              __typename
            }
            status
            sampleTestCase
            metaData
            judgerAvailable
            judgeType
            mysqlSchemas
            enableRunCode
            envInfo
            book {
              id
              bookName
              pressName
              source
              shortDescription
              fullDescription
              bookImgUrl
              pressImgUrl
              productUrl
              __typename
            }
            isSubscribed
            isDailyQuestion
            dailyRecordStatus
            editorType
            ugcQuestionId
            style
            exampleTestcases
            __typename
          }
        }
      `,
      variables: {titleSlug: title}
    },
    'question'
  )
}

export async function getSummary(username = '99PCT') {
  return await req(
    {
      query: `
        query userSessionProgress($userSlug: String!) {
          userProfileUserQuestionSubmitStats(userSlug: $userSlug) {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
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
      `,
      variables: {userSlug: username}
    },
    'userProfileUserQuestionProgress'
  )
}

export async function getTodayQuestion() {
  return await req(
    {
      query: `
        query questionOfToday {
          todayRecord {
            date
            userStatus
            question {
              questionId
              frontendQuestionId: questionFrontendId
              difficulty
              title
              titleCn: translatedTitle
              titleSlug
              paidOnly: isPaidOnly
              freqBar
              isFavor
              acRate
              status
              solutionNum
              hasVideoSolution
              topicTags {
                name
                nameTranslated: translatedName
                id
              }
              extra {
                topCompanyTags {
                  imgUrl
                  slug
                  numSubscribed
                }
              }
            }
            lastSubmission {
              id
            }
          }
        }
      `,
      variables: {}
    },
    'todayRecord'
  )
}

/**
 * 提交代码, 获取提价记录id
 * 使用提交记录id调用 checkSubmit 来获取提交结果
 * @param question
 * @param code
 * @returns {Promise<string>} submission_id
 */
export async function submit(question, code) {
  const res = await request.post(
    'https://leetcode-cn.com/problems/increasing-triplet-subsequence/submit/',
    {
      lang: "javascript",
      questionSlug: question.titleSlug,
      question_id: question.frontendQuestionId,
      test_judger: "",
      test_mode: false,
      typed_code: code
    }
  )
  return res.submission_id
}

/**
 * 获取提交结果
 * @param submission_id
 * @returns {Promise<unknown>}
 */
export async function checkSubmit(submission_id) {
  const req = async () => await request.get(
    `https://leetcode-cn.com/submissions/detail/${submission_id}/check/`
  )
  let res = await req()
  return new Promise(async resolve => {
    let times = 5
    while (times && res.state !== 'SUCCESS') {
      res = await req()
      times--
    }
    if (res.state === 'SUCCESS') {
      resolve(res)
    }
  })
}

/**
data item Example:
date: "2022-01-13"
question: {
  questionFrontendId: "747"
  title: "Largest Number At Least Twice of Others"
  titleSlug: "largest-number-at-least-twice-of-others"
  translatedTitle: "至少是其他数字两倍的最大数"
}
userStatus: "FINISH"
 * 获取指定月份的提交记录
 * @param {Number} year
 * @param {Number} month
 */
export async function getMonthDailyRecords (year, month) {
  return await req(
    {
      query: `
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
      `,
      variables: { year, month }
    },
    'dailyQuestionRecords'
  )
}


/**
 *
 * @param questionSlug
 * @returns {Promise<SubmissionRecord>}
 */
export async function getSubmissionRecords(questionSlug) {
  return await req(
    {
      operationName: 'submissions',
      query: `
        query submissions($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!, $markedOnly: Boolean, $lang: String) {
          submissionList(offset: $offset, limit: $limit, lastKey: $lastKey, questionSlug: $questionSlug, markedOnly: $markedOnly, lang: $lang) {
            lastKey
            hasNext
            submissions {
              id
              statusDisplay
              lang
              runtime
              timestamp
              url
              isPending
              memory
              submissionComment {
                comment
                flagType
                __typename
              }
              __typename
            }
            __typename
          }
        }
      `,
      variables: {
        offset: 0,
        limit: 40,
        lastKey: null,
        questionSlug
      }
    },
    'submissionList'
  )
}

/**
 *
 * @param submissionId
 * @returns {Promise<SubmissionDetail>}
 */
export async function getSubmissionDetail(submissionId) {
  return await req(
    {
      operationName: 'mySubmissionDetail',
      query: `
        query mySubmissionDetail($id: ID!) {
          submissionDetail(submissionId: $id) {
            id
            code
            runtime
            memory
            rawMemory
            statusDisplay
            timestamp
            lang
            passedTestCaseCnt
            totalTestCaseCnt
            sourceUrl
            question {
              titleSlug
              title
              translatedTitle
              questionId
              __typename
            }
            ... on GeneralSubmissionNode {
              outputDetail {
                codeOutput
                expectedOutput
                input
                compileError
                runtimeError
                lastTestcase
                __typename
              }
              __typename
            }
            submissionComment {
              comment
              flagType
              __typename
            }
            __typename
          }
        }
      `,
      variables: {
        id: submissionId
      }
    },
    'submissionDetail'
  )
}

/**
 * 获取题解
 * @param questionSlug
 * @returns {Promise<{ edges: SolutionArticleEdge[] }>}
 */
export async function getSolutionArticles(questionSlug) {
  return await req(
    {
      operationName: 'questionSolutionArticles',
      query: `
        query questionSolutionArticles($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {
          questionSolutionArticles(questionSlug: $questionSlug, skip: $skip, first: $first, orderBy: $orderBy, userInput: $userInput, tagSlugs: $tagSlugs) {
            totalNum
            edges {
              node {
                ...solutionArticle
                __typename
              }
              __typename
            }
            __typename
          }
        }
        
        fragment solutionArticle on SolutionArticleNode {
          rewardEnabled
          canEditReward
          uuid
          title
          slug
          sunk
          chargeType
          status
          identifier
          canEdit
          canSee
          reactionType
          reactionsV2 {
            count
            reactionType
            __typename
          }
          tags {
            name
            nameTranslated
            slug
            tagType
            __typename
          }
          createdAt
          thumbnail
          author {
            username
            profile {
              userAvatar
              userSlug
              realName
              __typename
            }
            __typename
          }
          summary
          topic {
            id
            commentCount
            viewCount
            __typename
          }
          byLeetcode
          isMyFavorite
          isMostPopular
          isEditorsPick
          hitCount
          videosInfo {
            videoId
            coverUrl
            duration
            __typename
          }
          __typename
        }
      `,
      variables: {
        first: 10,
        orderBy: 'DEFAULT',
        questionSlug,
        skip: 0
      }
    },
    'questionSolutionArticles'
  )
}


/**
 * 获取题解详情
 * @param solutionSlug
 * @returns {Promise<SolutionArticle>}
 */
export async function getSolutionDetail(solutionSlug) {
  return await req(
    {
      operationName: 'solutionDetailArticle',
      query: `
        query solutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {
          solutionArticle(slug: $slug, orderBy: $orderBy) {
            ...solutionArticle
            content
            question {
              questionTitleSlug
              __typename
            }
            position
            next {
              slug
              title
              __typename
            }
            prev {
              slug
              title
              __typename
            }
            __typename
          }
        }
        
        fragment solutionArticle on SolutionArticleNode {
          rewardEnabled
          canEditReward
          uuid
          title
          slug
          sunk
          chargeType
          status
          identifier
          canEdit
          canSee
          reactionType
          reactionsV2 {
            count
            reactionType
            __typename
          }
          tags {
            name
            nameTranslated
            slug
            tagType
            __typename
          }
          createdAt
          thumbnail
          author {
            username
            profile {
              userAvatar
              userSlug
              realName
              __typename
            }
            __typename
          }
          summary
          topic {
            id
            commentCount
            viewCount
            __typename
          }
          byLeetcode
          isMyFavorite
          isMostPopular
          isEditorsPick
          hitCount
          videosInfo {
            videoId
            coverUrl
            duration
            __typename
          }
          __typename
        }
      `,
      variables: {
        orderBy: 'DEFAULT',
        slug: solutionSlug
      }
    },
    'solutionArticle'
  )
}
