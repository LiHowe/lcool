import winston, { Logger } from 'winston'
import { logFile } from './path'

const data: { logger: null | Logger } = {
  logger: null
}

export function init () {
  data.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: logFile('debug'),
        level: 'debug',
      }),
      new winston.transports.File({
        filename: logFile('error'),
        level: 'error',
      }),
    ],
  })

  if (process.env['NODE_ENV'] !== 'production') {
    data.logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
}


class ILogger extends Logger {
  logger: Logger | null = null
  init() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: logFile('debug'),
          level: 'debug',
        }),
        new winston.transports.File({
          filename: logFile('error'),
          level: 'error',
        }),
      ],
    })

    if (process.env['NODE_ENV'] !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
  }
}

export const logger = new ILogger()
