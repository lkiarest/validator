/**
 * default rules
 */

export default {
    required: (val) => {
        return typeof val !== 'undefined' &&
            val !== '' &&
            val !== null
    },
    maxlength: (val, max) => {
        return !val || val.length <= max
    },
    minlength: (val, min) => {
        return val && val.length >= min
    }
}
