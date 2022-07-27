import Handlebars from 'handlebars'
import { resolve } from 'path'
import { read, write, cwd } from '@lcool/utils'

export interface QuestionTemplateData {
  createTime: string
  id: number | string
  titleCn: string
  title: string
  tags: string[]
  link: string
  difficulty: string
  acRate: number | string
  totalAccepted: number | string
  totalSubmission: number | string
  detail: string[] // 题目描述
  code: string
}

export function generateQuestion(data: QuestionTemplateData): void {
  const source = read(resolve(__dirname, '../templates/question.hbs'))
  const template = Handlebars.compile(source)
  write(template(data), resolve(cwd, './test/question.js'))
}
