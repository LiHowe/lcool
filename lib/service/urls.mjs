// fork from: https://github.com/skygragon/leetcode-cli/blob/HEAD/lib/config.js#L33
export const url = {
  base:            'https://leetcode.cn',
  graphql:         'https://leetcode.cn/graphql',
  login:           'https://leetcode.cn/accounts/login/',
  problems:        'https://leetcode.cn/api/problems/$category/',
  problem:         'https://leetcode.cn/problems/$slug/description/',
  test:            'https://leetcode.cn/problems/$slug/interpret_solution/',
  session:         'https://leetcode.cn/session/',
  submit:          'https://leetcode.cn/problems/$slug/submit/',
  submissions:     'https://leetcode.cn/api/submissions/$slug',
  submission:      'https://leetcode.cn/submissions/detail/$id/',
  verify:          'https://leetcode.cn/submissions/detail/$id/check/',
  favorites:       'https://leetcode.cn/list/api/questions',
  favorite_delete: 'https://leetcode.cn/list/api/questions/$hash/$id',
}
