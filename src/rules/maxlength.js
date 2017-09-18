/**
 * 判断字符串是否满足最大长度限制
 */
export default (val, max) => {
    return !val || val.length <= max
}
