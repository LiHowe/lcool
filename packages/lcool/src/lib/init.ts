import prompts from 'prompts'
import { hasEnv } from '@lcool/utils'

interface InitOptions {
  endpoint?: 'leetcode' | 'leetcode-cn'
  hasGit?: boolean
  sync?: boolean
  loginType?: 'github' | 'leetcode' | 'cookie'
}

async function quiz(): Promise<InitOptions> {
  const questions: prompts.PromptObject[] = [
    {
      type: 'select',
      name: 'endpoint',
      message: '请选择 LeetCode 站点',
      choices: [
        { title: 'LeetCode-US', value: 'leetcode' },
        { title: 'LeetCodeCN', value: 'leetcode-cn' },
      ]
    },
    {
      type: await hasEnv('Git') ? 'confirm' : null,
      name: 'hasGit',
      message: '是否需要使用Git初始化项目?'
    },
    {
      type: 'confirm',
      name: 'sync',
      message: '是否同步做题记录(需登录)?',
      initial: true,
    },
    {
      type: (prev: boolean) => prev ? 'select' : null,
      name: 'loginType',
      message: '请选择登录方式',
      choices: [
        { title: 'GitHub', value: 'github' },
        { title: 'LeetCode Account', value: 'leetcode' },
        { title: 'Cookie', value: 'cookie' },
      ]
    }
  ]
  return prompts(questions)
}

export async function init() {
  // ..
  const ans = await quiz()
  console.log(ans)
}
