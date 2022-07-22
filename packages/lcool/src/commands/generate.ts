import { program } from 'commander'

export const generate = () => program
.command('generate')
.alias('g')
.description('生成题目文件')
.option('-T --today', '今天题目', true) // default generate today question
.option('-E --exact <questionId>', '具体题目, 提供题目编号', '')
.option('-R --random [difficulty]', '随便儿来一道, 默认简单(easy), 支持: easy | medium | hard', 'easy')
.option('-A --all', '生成全部题目')
.option('-C --category <category>', '指定分类', '')
.option('--force', '覆盖已有文件')
.action(generateHandler)

function generateHandler() {
  // ..
}
