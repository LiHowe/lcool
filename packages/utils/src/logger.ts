import winston, { Logger } from 'winston'
import { logFile } from './path'

class ILogger {
  private logger!: Logger
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
  getLogger() {
    return this.logger
  }
}

export const logger = new ILogger()
export const log = logger.getLogger()
