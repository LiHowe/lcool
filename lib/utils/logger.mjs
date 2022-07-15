import winston from 'winston'
import { getPath, logRoot } from './path.mjs'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: getPath(logRoot, 'debug.log'),
      level: 'debug',
    }),
    new winston.transports.File({
      filename: getPath(logRoot, 'error.log'),
      level: 'error',
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
