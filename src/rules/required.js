/**
 * 检查必填项
 */
export default (val) => {
    return typeof val !== 'undefined' &&
        val !== null &&
        val !== ''
}
