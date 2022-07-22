import { user, accountLogin } from '../src/commands'

describe('test:user account login', () => {
  it('should login with account', async() => {
    // await user()
    await accountLogin()
  })
})
