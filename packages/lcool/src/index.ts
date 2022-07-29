#!/usr/bin/env node
import { Command, program } from 'commander'
import figlet from 'figlet'

import {
  cache,
  config,
  logger,
} from '@lcool/utils'

import {
  init,
  generate,
  user,
  version,
} from './commands'

class LCool {
  constructor() {
    logger.init()
    cache.init()
    config.init()
  }
  async bootstrap() {
    figlet('LCOOL', (err, data) => console.log(data))
    program
    .name('lcool')
    .usage('<command> [options]')
    .addCommand(init())
    .addCommand(generate())
    .addCommand(user())
    .version(await version())
    program.parseAsync()
  }
  addCommand(cmd: Command) {
    program.addCommand(cmd)
  }
}

export const lcool = new LCool()
lcool.bootstrap()
