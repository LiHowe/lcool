import { login } from '../src'

describe('getCSRFToken', () => {
  // it('should return a csrf token', async () => {
  //   const token = await getCSRFToken()
  //   expect(token).toBeTruthy()
  // })
  it('tst', async () => {
    const res = await login({ username: '', password: '' })
    console.log(res)
  })
})
