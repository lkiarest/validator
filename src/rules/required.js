/**
 * 检查必填项
 * @param {Boolean} [bTrim=false] 是否对字符串做 trim 处理
 */
export default (val, bTrim) => {
    if (bTrim && typeof val === 'string') {
        val = val.trim()
    }

    return typeof val !== 'undefined' &&
        val !== null &&
        val !== ''
}
