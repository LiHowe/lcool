import envinfo from 'envinfo'

export async function getEnvInfo (): Promise<Record<string, any>> {
  const res =  await envinfo.run({
    Binaries: ['Node', 'npm', 'Yarn'],
    System: ['OS', 'CPU', 'Memory', 'Shell'],
    IDEs: ['VSCode'],
    Utilities: ['Git'],
    npmGlobalPackages: ['pnpm'],
  }, { json: true })
  return JSON.parse(res)
}

export async function hasEnv(key: string) {
  const env = await getEnvInfo()
  return (Object.values(env).reduce((init, item) => {
    Object.assign(init, item)
    return init
  }, {}) as Record<string, any>)[key]
}
