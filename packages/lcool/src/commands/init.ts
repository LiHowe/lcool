import {
  shell,
  isExist,
  remove,
  logger,
  config,
} from '@lcool/utils'
import { program } from 'commander'
import prompts from 'prompts'
import ora from 'ora'

export const init = () => program
.command('init [name]')
.description('初始化本地仓库')
.action(initHandler)

interface InitOptions extends Record<string, unknown> {
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
    }
  ]
  return prompts(questions)
}

const templateRepoURL = 'https://github.com/LiHowe/lcool-template'
const templateRepoName = 'leetcode'

async function initHandler(repoName: string = templateRepoName) {
  // ..
  const ans = await quiz()
  config.init()
  config.set(ans)
  if (isExist(repoName)) {
    const { cover } = await prompts([{
      type: 'confirm',
      name: 'cover',
      message: 'leetcode文件夹已经存在, 是否覆盖?',
    }])
    if (cover) {
      remove(repoName)
    }
  }
  const spin = ora('生成项目中...').start()
  spin[await clone(repoName) ? 'succeed' : 'warn']()
}

// WIP
async function clone(repoName: string) {
  try {
    // clone repo
    await shell(`git clone ${templateRepoURL} ${repoName}`, {
      timeout: 60 * 1000,
    })
    // remove git remote, or just remove .git folder
    remove(`${repoName}/.git`)
    return true
  } catch (e) {
    remove(repoName)
    logger.error(e)
    return false
  }
}

async function createQuestionIndex() {
  // ..
}



