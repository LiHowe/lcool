import { write } from '@lcool/utils'
import {} from '@lcool/api'
import { Command } from 'commander'

// 用于同步做过的题到仓库
// 包含题目, 多个题解

export const sync = () => new Command('sync')


// single question
function syncQuestion(questionSlug: string): void
function syncQuestion(questionId: number): void
// multiple questions
function syncQuestion(slugs: string[]): void
function syncQuestion(ids: number[]): void
function syncQuestion(params: string | number | Array<string|number>) {
  // TODO
}
