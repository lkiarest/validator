/**
 * 校验邮箱格式
 */
export default (val) => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
}
