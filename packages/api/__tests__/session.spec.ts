import { getSession } from '../src/session'

describe('test: session', () => {
  it('should be expired', () => {
    getSession().then(res => {
      console.log(res)
    })
  })
})
