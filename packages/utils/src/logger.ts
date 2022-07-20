import winston from 'winston'
import { logFile } from './path'

export const logger = winston.createLogger({
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
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
})
