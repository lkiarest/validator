/**
 * 通用校验模块，可自行扩展
 */

// 内置默认规则，每一个规则包含 name 和 validate function
import registeredRules from '../build/tmpRules'

/**
 * 新增校验规则
 * @param  {Object | Array} rule 规则（可以使用数组传多个）
 * @example
 *     <caption>rule definition</caption>
 *     {
 *         name: 'test',
 *         validate: (val) => {
 *             return val === 'test'
 *         }
 *     }
 * @return {[type]}      [description]
 */
const register = (rule) => {
    if (!rule || (typeof rule !== 'object')) {
        console.error('register rule failed: must be an object or an array')
        return false
    }

    if (Array.isArray(rule)) {
        let success = true
        rule.forEach(item => {
            if (!register(item)) {
                success = false
            }
        })

        return success
    }

    let name = rule.name
    if (!name) {
        console.error('register rule failed: no name specified')
        return false
    }

    if (registeredRules[name]) {
        console.error('register rule failed: duplicate name')
        return false
    }

    let valid = rule.validate
    if (!valid || typeof valid !== 'function') {
        console.error('register rule failed: no validate function specified')
        return false
    }

    registeredRules[name] = valid
    return true
}

/**
 * 执行校验
 * @param  {Object} obj  需要校验的对象
 * @param  {String} name 需要校验的字段
 * @param  {String | Function} ruleDef 需要校验的规则
 * @return {Object}      校验结果，通过返回 null，失败返回错误信息
 */
const validateRule = (obj, name, ruleDef) => {
    let val = obj[name] // 若为 undefined 依然使用规则进行处理
    let {rule, errorMsg, params} = ruleDef
    let validFunc = rule

    if (typeof validFunc === 'string') {
        validFunc = registeredRules[rule]
        if (!validFunc) { // 未定义的规则
            return {
                name,
                message: '无此校验规则:' + validFunc
            }
        }
    }

    const args = [val]
    if (typeof params !== 'undefined') {
        if (Array.isArray(params)) {
            args.push.apply(args, params)
        } else {
            args.push(params)
        }
    }

    const valid = validFunc.apply(obj, args)
    return valid ? null : {
        name,
        message: errorMsg
    }
}

/**
 * 校验函数，暂不支持异步校验
 * @param  {Object} obj   待校验对象，为键值对如：{name: '11', age: '-1'}
 * @param  {Object} rules 校验规则支持默认规则和自定义规则（一个或多个）
 * @example
 *     <caption>Rules definition</caption>
 *     const rules = {
 *         name: {
 *             rule: 'required',
 *             errorMsg: '姓名必须填写'
 *         }, // 默认规则
 *         age: [{
 *             rule: 'max',
 *             params: 18, // 根据规则定义可传入参数
 *             errorMsg: '年龄必须小于 18'
 *         }, {
 *             rule: 'min',
 *             params: 0, // 根据规则定义可传入参数
 *             errorMsg: '年龄必须大于 0'
 *         }],
 *         time: [{
 *             rule: 'required',
 *             errorMsg: '时间必须填写'
 *         }, {
 *             rule: val => { // 自定义规则
 *                 return val > 0 && val < 18
 *             },
 *             errorMsg: '年龄必须在 0 到 18 之间'
 *         }]
 *     }
 *
 *     validate({name: '', age: 19}) === false // all rules validate failed
 *
 * @return {Object}       是否通过校验 {success: true} / {success: false, errors: [...]}
 */
const validate = (obj, rules) => {
    if (!obj || !rules) { // 无参数或规则，直接返回失败
        return {success: false, errors: ['校验缺少参数']}
    }

    const errors = []

    Object.keys(rules).forEach(key => {
        const ruleSet = rules[key]

        if (Array.isArray(ruleSet)) {
            ruleSet.forEach(rule => {
                let ret = validateRule(obj, key, rule)
                if (ret) { // 返回错误信息
                    errors.push(ret)
                }
            })
        } else {
            let ret = validateRule(obj, key, ruleSet)
            if (ret) { // 返回错误信息
                errors.push(ret)
            }
        }
    })

    let success = errors.length === 0
    return {
        success,
        errors
    }
}

export default {
    validate,
    register
}
