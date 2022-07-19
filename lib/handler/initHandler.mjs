import prompts from 'prompts'
import ora from 'ora'
import fs from 'fs-extra'

import { removeDir } from '../utils/file.mjs'

import { getRepo, projectRoot } from '../utils/cloneRepo.mjs'
import config, { Config } from '../utils/configuration.mjs'
import { cwdPath } from '../utils/path.mjs'
import { logger } from '../utils/logger.mjs'
import { exec } from 'child_process'
import { hasEnv } from '../utils/env.mjs'

const questions = [
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
    type: 'select',
    name: 'structure',
    message: '你想要使用什么样的目录结构?',
    choices: [
      { title: '单文件', description: '一个问题对应一个文件, 问题描述作为注释', value: 'file' },
      { title: '文件夹', description: '一个问题对应一个文件夹，文件夹命名与问题相同. 可设置注释为单独文件.', value: 'folder' },
    ]
  },
  {
    type: prev => prev === 'folder' ? 'select' : null,
    name: 'folderStructure',
    message: '文件夹内使用什么样的目录结构?',
    choices: [
      { title: '单代码文件', description: '题目信息作为代码文件注释', value: 'code' },
      { title: 'md + 代码文件', description: 'md文件用于存放题目信息, 与代码文件分离', value: 'code,md'}
    ]
  },
  {
    type: 'autocomplete',
    name: 'language',
    message: '你所使用的编程语言是什么?(当前版本只支持JS...)',
    choices: [
      // { title: 'C++', value: 'cpp' },
      // { title: 'C#', value: 'csharp' },
      // { title: 'C', value: 'c' },
      // { title: 'Java', value: 'java' },
      { title: 'JavaScript', value: 'javascript' },
      // { title: 'TypeScript', value: 'typescript' },
      // { title: 'Python', value: 'python' },
      // { title: 'Python3', value: 'python' },
      // 待补充, 官方共支持18种语言
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
    type: prev => prev ? 'select' : null,
    name: 'loginType',
    message: '请选择登录方式',
    choices: [
      { title: 'GitHub', value: 'github' },
      { title: 'LeetCode Account', value: 'leetcode' },
      { title: 'Cookie', value: 'cookie' },
    ]
  }
]

// Steps
// 1. clone repo from github √
// 2. cd to the folder
// 4. presist config

export const handleInit = async () => {
  let ans
  ans = await prompts(questions, {
    onCancel: () => {
      ans = null
      logger.info('取消初始化')
      return false
    }
  })
  if (!ans) return
  let exist = false
  try {
    const files = fs.readdirSync(projectRoot)
    exist = files && files.length > 0
  } catch(e) {
    exist = false
  }
  if (exist) {
    const ans = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: '已存在非空项目目录, 是否覆盖?'
    })
    if (!ans.confirm) return
    try {
      removeDir(projectRoot)
    } catch (e) {
      logger.error('覆盖目录失败' + e)
      return
    }
  }
  const spin = ora('初始化项目中...').start()
  try {
    const repoPath = await getRepo()
    config.init(cwdPath(repoPath, Config.FileName))
    ans.hasGit && await initGit()
    spin.succeed('初始化完成')
  } catch(e) {
    spin.fail('初始化失败')
  }
}

function initGit() {
  return new Promise(resolve => {
    exec('git init', {
      cwd: projectRoot
    }, (err) => {
      if (err) logger.error(err)
      resolve(!err)
    })
  })
}
