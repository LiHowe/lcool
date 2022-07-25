import { generateQuestion, QuestionTemplate } from '../src/lib/question'

describe('test:generate question', () => {
  it('should return a question', () => {
    const data: QuestionTemplate = {
      createTime: '2020-01-01',
      id: '1',
      titleCn: '题目标题',
      title: '题目标题',
      tags: ['tag1', 'tag2'],
      link: 'https://leetcode.com/problems/xxx',
      acRate: '0.00%',
      difficulty: 'easy',
      totalAccepted: '0',
      totalSubmission: '0',
      detail: `题目描述
        第一行描述

        空一行描述

        最后一行描述`.split('\n').map(line => line.trim()),
      code: `
      function solution(n: number) {
        return n
      }
      `,
    }
    const question = generateQuestion(data)
  })
})
