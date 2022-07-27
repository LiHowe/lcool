import { getTodayQuestion, getAllQuestions } from '../src/question'

describe('test request: question', () => {
  it('getTodayQuestion', async () => {
    const res = await getTodayQuestion()
    expect(res).toHaveLength(1)
    expect(res).toBeInstanceOf(Array)
    expect(res[0][0].question.titleSlug).toBe('design-skiplist')
  })

  it ('should get all questions', async () => {
    const res = await getAllQuestions()
    expect(res).toHaveLength(10)
    expect(res.length).toBeGreaterThan(1000)
  })
})
