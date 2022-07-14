import prompts from 'prompts'

const questions = [
  {
    type: 'toggle',
    name: 'global',
    message: '你想使用的是哪个LeetCode站点',
    active: '国际站',
    inactive: '国内站',
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
    type: 'confirm',
    name: 'sync',
    message: '是否同步做题记录(需Token登录)?',
    initial: true,
  },
  {
    type: prev => prev ? 'text' : null,
    name: 'token',
    message: '请输入你的leetcode token (Cookie中的LEETCODE_SESSION值)'
  }
]

// Steps
// 1. clone repo from github
// 2. cd to the folder
// 3. remove .git and re-init
// 4. presist config

export const handleInit = async () => {
  const ans = await prompts(questions)
  console.log(ans)
}

