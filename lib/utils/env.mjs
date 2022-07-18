import envinfo from 'envinfo'

export async function getEnvInfo () {
  const res =  await envinfo.run({
    Binaries: ['Node', 'npm', 'Yarn'],
    System: ['OS', 'CPU', 'Memory', 'Shell'],
    IDEs: ['VSCode'],
    Utilities: ['Git'],
    npmGlobalPackages: ['pnpm'],
  }, { json: true })
  return JSON.parse(res)
}

export async function hasEnv(key) {
  const env = await getEnvInfo()
  return Object.values(env).reduce((init, item) => {
    Object.assign(init, item)
    return init
  }, {})[key]
}

