import Handlebars from 'handlebars'
import { resolve } from 'path'
import { read, write, cwd } from '@lcool/utils'
import { QuestionDetail } from '@lcool/api'

export function generateQuestion(data: QuestionDetail): string {
  const source = read(resolve(__dirname, '../templates/question.hbs'))
  const template = Handlebars.compile(source)
  const code = data.codeSnippets.find(item => item.langSlug === 'javascript')?.code
  const detail = data.translatedContent
    .replaceAll(/<\/?\w+>/g, '')
    .replaceAll(/\n{1,3}/g, '|')
    .replaceAll('&nbsp;', ' ')
    .split('|')
  // TODO: HTML escape
  const path = resolve(cwd, './test/question.js')
  write(path, template({
    ...data,
    code,
    detail,
    createTime: new Date().toLocaleDateString(),
    tags: data.topicTags.map(item => item.translatedName),
    link: `https://leetcode.cn/problems/${data.titleSlug}`
  }))
  return path
}
