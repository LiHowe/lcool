#!/usr/bin/env node
import { program } from 'commander'
import {
  // handleGenerate,
  // handleSessionLogin,
  // handleUpdateProgress,
  // handleClean,
  version,
  init,
} from './lib'

program
.command('init')
.description('初始化本地仓库')
.action(init)

program
.command('version')
.description('查看版本号')
.action(version)

// program
// .command('generate')
// .alias('g')
// .description('生成题目文件')
// .option('-T --today', '今天题目', false)
// .option('-E --exact <questionId>', '具体题目, 提供题目编号', '')
// .option('-R --random [difficulty]', '随便儿来一道, 默认简单(easy), 支持: easy | medium | hard', 'easy')
// .option('-A --all', '生成全部题目')
// .option('--force', '覆盖已有文件')
// .action(handleGenerate)

// // WIP
// program
// .command('clean')
// .description('清除无用(空题目文件)')
// .action(handleClean)

// program
// .command('update-progress')
// .alias('u')
// .description('生成README文件进度信息')
// .action(handleUpdateProgress)

// // 通过LeetCode的Cookie中的session token 来登录，并写入当前文件夹内的缓存文件夹中
// program
// .command('login')
// .description('Session登录')
// .argument('<session>', 'LeetCode-CN Cookie中的LEETCODE_SESSION')
// .action(handleSessionLogin)

program.parseAsync()
