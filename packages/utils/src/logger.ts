import winston, { Logger, format } from 'winston'
import { logFile } from './path'

const { timestamp, combine, colorize, printf } = format

const logFormatter = printf((info) => {
  const { timestamp, level, message } = info
  return `${timestamp} [${level}]: ${message}`
})

class ILogger {
  private logger!: Logger

  init() {
    this.logger = winston.createLogger({
      format: combine(
        colorize(),
        timestamp(),
        logFormatter,
      ),
      transports: [
        new winston.transports.File({
          filename: logFile('debug'),
          level: 'debug',
        }),
        new winston.transports.File({
          filename: logFile('error'),
          level: 'error',
        }),
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      ],
    })
  }

  warn(message: string) {
    this.logger.log({
      level: 'warn',
      message,
    })
  }
  info(message: string) {
    this.logger.log({
      level: 'info',
      message,
    })
  }
  error(message: string) {
    this.logger.log({
      level: 'error',
      message,
    })
  }
  debug(message: string) {
    this.logger.log({
      level: 'debug',
      message,
    })
  }
}

export const logger = new ILogger()
