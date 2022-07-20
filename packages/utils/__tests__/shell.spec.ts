import { shell } from '..'

describe('test:shell', () => {
  it('should return stdout', async () => {
    const { stdout } = await shell('echo "hello"')
    expect(stdout).toBe('hello\n')
  })
  it('should return stderr', async () => {
    const { stderr } = await shell('echo "hello" >&2')
    expect(stderr).toBe('hello\n')
  })
  it('should return error', async () => {
    try {
      await shell('echo "hello" >&2 && false')
    } catch (err) {
      expect(err).toBe('Command failed: echo "hello" >&2 && false\nhello\n')
    }
  })
})
