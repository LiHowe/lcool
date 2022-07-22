import { exec } from 'child_process'

export function shell(cmd: string, opts: {
  cwd?: string,
  timeout?: number,
} = {}): Promise<{
  stdout?: string,
  stderr?: string
}> {
  return new Promise((resolve, reject) => {
    exec(cmd, {
      windowsHide: true,
      ...opts,
    },(err, stdout, stderr) => {
      if (err) {
        reject(err.message)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
