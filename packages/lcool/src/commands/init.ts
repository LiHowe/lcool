import {
  shell,
  isExist,
  remove,
  logger,
  config,
  cache,
} from '@lcool/utils'
import { getAllQuestions } from '@lcool/api'
import ora from 'ora'
import { Command } from 'commander'
import { quiz } from '../utils/prompts'

export const init = () => {
  const init = new Command('init')
  init
  .argument('[name]', '项目名称')
  .description('初始化本地仓库')
  .action(initHandler)
  return init
}

interface InitOptions extends Record<string, unknown> {
  endpoint?: 'leetcode' | 'leetcode-cn'
  hasGit?: boolean
  sync?: boolean
  loginType?: 'github' | 'leetcode' | 'cookie'
}

const templateRepoURL = 'https://github.com/LiHowe/lcool-template'
const templateRepoName = 'leetcode'

async function initHandler(repoName: string = templateRepoName) {
  // const ans = await quiz([
  //   {
  //     type: 'select',
  //     name: 'endpoint',
  //     message: '请选择 LeetCode 站点',
  //     choices: [
  //       { title: 'LeetCode-US', value: 'leetcode' },
  //       { title: 'LeetCodeCN', value: 'leetcode-cn' },
  //     ]
  //   }
  // ])
  // config.init()
  // config.set(ans)
  const spin = ora('初始化leetcode项目中...').start()
  if (isExist(repoName)) {
    const { cover } = await quiz([{
      type: 'confirm',
      name: 'cover',
      message: 'leetcode文件夹已经存在, 是否覆盖?',
    }])
    if (cover) {
      remove(repoName)
    }
  }
  if (!checkQuestionIndex()) {
    await createQuestionIndex()
  }
  const success = await clone(repoName)
  spin[success? 'succeed' : 'warn'](`初始化${success ? '成功' : '失败'}`)
}

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
    logger.error(`克隆Git仓库失败`)
    return false
  }
}

// 初始化的时候创建问题索引, 将全部问题缓存到本地
export async function createQuestionIndex() {
  // ..
  try {
    const allQuestions = await getAllQuestions()
    cache.set('questions', allQuestions)
  } catch (e) {
    logger.error(`创建题目索引文件失败, ${e}`)
  }
}

// 检查题目索引是否已经存在
export function checkQuestionIndex() {
  try {
    const c = cache.get('questions')
    return !!c
  } catch (e) {
    return false
  }
}
