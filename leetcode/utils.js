const seq = []
let err = 0
let pending = false
const timeLog = (name, fn, args, expect, showAll) => {
    const output = fn(...args)
    const res = JSON.stringify(output) === JSON.stringify(expect)
    if (!res) err++
    if (showAll || !res) {
        separator()
        console.log('input  ->', args)
        console.log('expect ->', expect)
        console.time(name)
        console.log('output ->', output)
        console.log('result ->', res ? '✅' : '❌')
        console.timeEnd(name)
        separator()
    }
}
const separator = () => {
    console.log('-----------------------------\n')
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

function ListNode(val, next) {
   this.val = (val===undefined ? 0 : val)
   this.next = (next===undefined ? null : next)
}

function runSeq() {
    pending = true
    const sum = seq.length
    if (!sum) return
    while(seq.length > 0) {
       seq.shift()()
    }
    console.log(`共${sum}个测试用例, 通过${sum - err}个`)
    pending = false
}

module.exports = {
    /**
     *
     * @param {Function} fn
     * @param {Array} args
     * @param {any} expect
     */
    test: (fn, args, expect, showAll = false) => {
        if (!(args instanceof Array)) {
            args = [args]
        }
        seq.push(() => {timeLog('runtime', fn, args, expect, showAll)})
        setTimeout(() => {
            if (!pending) runSeq()
        }, 100)
    },
    /**
     * 数组转换为二叉树
     * @param {Array} arr
     */
    generateTreeNode: (arr) => {
        if (!arr || !arr.length) return null
        const root = new TreeNode(arr.shift())
        let target = root
        while (arr.length) {
            const val = arr.shift()
            if (!root.left) {

            }
            root[step % 2 ? 'right': 'left'] = new TreeNode(val)
            step++
        }
        return res
    },
    /**
     * 数组转为链表
     * @param {Array} arr
     * @returns {Array}
     */
    generateLinkedList: (arr) => {
        if (!arr || !arr.length) return null
        let start = 0
        function loop(s) {
            if (s === arr.length) return null
            const node = new ListNode(arr[s], loop(s + 1))
            return node
        }
        return loop(start)
    }
}
