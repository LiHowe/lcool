import { getTodayQuestion } from '../lib/service/api.mjs'
import * as axios from 'axios'

jest.mock('axios')

describe('test: api', function () {
  test('generate', async () => {
    const res = await getTodayQuestion()
    console.log(res)
  })
});
