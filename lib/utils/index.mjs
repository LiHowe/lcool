import path from 'path'
import {
  HTML_ESCAPE_MAPPING__REVERSE, REGS,
} from './variables.mjs'

export function escapeString (str) {
  return str.replace(REGS.HTML_ESCAPE, char => HTML_ESCAPE_MAPPING__REVERSE[char])
}

export function toJSON (obj) {
  return JSON.stringify(obj, null, 2)
}

export function fromJSON (str) {
  return JSON.parse(str)
}

export function getPath(...p) {
  return path.resolve(process.cwd(), ...p)
}
