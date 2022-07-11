import { resolve } from 'path'
import {
  HTML_ESCAPE_MAPPING__REVERSE, REGS,
} from './variables.mjs'

function escapeString (str) {
  return str.replace(REGS.HTML_ESCAPE, char => HTML_ESCAPE_MAPPING__REVERSE[char])
}

function getRootPath(...args) {
  return resolve(process.cwd(), ...args)
}

function toJSON (obj) {
  return JSON.stringify(obj, null, 2)
}

function fromJSON (str) {
  return JSON.parse(str)
}


export {
  getRootPath,
  escapeString,
  toJSON,
  fromJSON
}
