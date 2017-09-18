/**
 * 最小数字限制
 */
export default (val, min) => {
    val = +val
    if (isNaN(val)) {
        return false
    }

    return val >= min
}
