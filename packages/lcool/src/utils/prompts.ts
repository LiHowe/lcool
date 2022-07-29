import prompts from 'prompts'

export function quiz<T extends string = string>(
  questions: prompts.PromptObject[]
): Promise<prompts.Answers<T>> {
  return prompts(questions, {
    onCancel() {
      process.exit(1)
    }
  })
}
