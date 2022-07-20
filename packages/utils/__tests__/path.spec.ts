import * as path from '../src/path'

describe('static path test', () => {
  it('should equal process.cwd', () => {
    console.log(process.cwd())
    expect(path.cwd).toEqual(process.cwd())
  })
})
