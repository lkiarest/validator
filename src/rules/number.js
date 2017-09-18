/**
 * 判断是否为 number
 */
export default (val) => {
    return (val != '') && (val == +val) && isFinite(val)
}
