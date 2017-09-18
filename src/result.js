/**
 * 封装校验返回值
 */
const Result = function(success, errors) {
    this.success = success
    this.errors = errors
}

Result.prototype = {
    ok: function() {
        return !!this.success
    },
    getErrors: function() {
        return this.errors || []
    },
    getFirstError: function() {
        return this.errors && this.errors[0] || null
    }
}

export default Result
