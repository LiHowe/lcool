import Handlebars from 'handlebars'
import { resolve } from 'path'
import { read, write, cwd } from '@lcool/utils'

export interface ReadmeTemplateData {
  repoName: string
  description: string
  updateTime: string
  progress: {
    id: number | string
    title: string // 英文标题
    titleCn?: string // 中文标题
    status?: string // 题目状态

  }[]
  summary: {
    accNum: number | string
    failNum: number | string
    untouchNum: number | string
  }
}

export type ReadmeProgressData = ReadmeTemplateData['progress']
export type ReadmeSummaryData = ReadmeTemplateData['summary']

export function generateReadme(data: ReadmeTemplateData): void {
  const source = read(resolve(__dirname, '../templates/readme/index.hbs'))
  write([
    Handlebars.compile(source)(data),
    genSummary(data.summary),
    genProgress(data.progress),
  ].join(''), resolve(cwd, './test/README.md'))
}

function genSummary(summaryData: ReadmeSummaryData) {
  const source = read(resolve(__dirname, '../templates/readme/summary.hbs'))
  return Handlebars.compile(source)(summaryData)
}

function genProgress(progressData: ReadmeProgressData) {
  const source = read(resolve(__dirname, '../templates/readme/progress.hbs'))
  return Handlebars.compile(source)(progressData)
}
