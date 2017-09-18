/**
 * 使用正则表达式校验字符串
 */
export default (val, reg) => {
    if (!reg) {
        return false
    }

    const regex = new RegExp(reg)
    return regex.test(val)
}
