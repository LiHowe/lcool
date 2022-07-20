import { exec } from 'child_process'

export function shell(cmd: string): Promise<{
  stdout?: string,
  stderr?: string
}> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err.message)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
