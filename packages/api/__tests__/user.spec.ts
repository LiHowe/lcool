import { login } from '../src'

describe('test:user', () => {

  it('should login', () => {
    expect(login({ username: 'x.x@gmail.com', password: 'xxx.' })).resolves.toThrowError()
  })
})
