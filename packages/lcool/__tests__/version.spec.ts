import {
  version,
  getLatestVersion,
  getLocalVersion,
} from '../src/commands'

describe('test version', () => {
  it('should return version', () => {
    expect(version()).toBe('0.0.5')
  })
  it('should get latest info', async () => {
    const v = await getLatestVersion()
    expect(v).toBe('0.0.5')
  })
  it('should get local version', () => {
    expect(getLocalVersion()).toBe('0.0.5')
  })
})
