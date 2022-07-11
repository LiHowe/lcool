const QUESTION_STATUS = {
  AC: 'AC',
  TRIED: 'TRIED',
  NOT_STARTED: 'NOT_STARTED'
}

const QUESTION_STATUS_1 = {
  AC: 'ac',
  TRIED: 'notac',
  NOT_STARTED: null
}

const FLAGS = {
  CODE_START: '@lc-start',
  CODE_END: '@lc-end',
  DESC_START: '@lc-anno-start',
  DESC_END: '@lc-anno-end',
}

const REGS = {
  CODE_BLOCK: `/(\/\/${FLAGS.CODE_START})[\s\S]+(\/\/${FLAGS.CODE_END})/g`,
  HTML_ESCAPE: /&(amp|lt|gt|apos|quot|le|ge|nbsp|#39);/g,
}

const HTML_ESCAPE_MAPPING = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
  '≤': '&le;',
  '≥': '&ge;',
  ' ': '&nbsp;'
}

const HTML_ESCAPE_MAPPING__REVERSE = Object.keys(HTML_ESCAPE_MAPPING).reduce((init, c)=> {
  init[HTML_ESCAPE_MAPPING[c]] = c
  return init
}, {})


export {
  QUESTION_STATUS,
  QUESTION_STATUS_1,
  FLAGS,
  REGS,
  HTML_ESCAPE_MAPPING,
  HTML_ESCAPE_MAPPING__REVERSE
}
