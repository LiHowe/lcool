const tableSeparator = ' | '

export function genTableHeader (strArr) {
  return genTableRowByStr(strArr.join(tableSeparator))
    + genTableRowByStr(new Array(strArr.length).fill('---').join(tableSeparator))
}

export function genTableRowByStr (str, breakLine = true) {
  return `| ${str} | ${breakLine ? '\n' : ''}`
}

export function genTableRowByObject (obj, breakLine = true) {
  return genTableRowByStr(Object.values(obj).join(tableSeparator), breakLine)
}

export function genTableRowByArr (arr, breakLine = true) {
  return genTableRowByStr(arr.join(tableSeparator), breakLine)
}

export function genBold (str) {
  return `**${str}**`
}

export function genTitle(level, str) {
  return `${new Array(level).fill('#').join('')} ${str}\n\n`
}
