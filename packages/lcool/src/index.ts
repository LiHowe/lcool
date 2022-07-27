#!/usr/bin/env node
import { program } from 'commander'
import figlet from 'figlet'

import { cache, config, logger } from '@lcool/utils'

import {
  init,
  generate,
  user,
  version,
} from './commands'

figlet('LCOOL', () => {
  logger.init()
  cache.init()
  config.init()

  program
    .name('lcool')
    .usage('<command> [options]')

  version()
  init()
  generate()
  user()

  program.parseAsync()
})

