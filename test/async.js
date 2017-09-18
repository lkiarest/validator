/**
 * test async check
 */

describe("[async check]", function() {
    it("promise ok",function(done) {
        validator.validate({
            email: 'hello'
        }, {
            email: {
                rule: function(val) {
                    return new Promise(resolve => {
                        setTimeout(function() {
                            resolve(val === 'hello')
                        }, 1000)
                    })
                },
                errorMsg: 'not an email'
            }
        }).then(function(result) {
            // console.log(result)
            expect(true).toEqual(result.ok())
            done()
        })
    })

    it("promise error",function(done) {
        validator.validate({
            email: 'hello world'
        }, {
            email: {
                rule: function(val) {
                    return new Promise((resolve, reject) => {
                        setTimeout(function() {
                            reject()
                        }, 1000)
                    })
                },
                errorMsg: 'not an email'
            }
        }).then(function(result) {
            expect(false).toEqual(result.ok())
            expect('not an email').toEqual(result.getFirstError().message)
            done()
        })
    })

    it("promise complex",function(done) {
        validator.validate({
            name: 'hello',
            email: 'hello world'
        }, {
            email: [{
                rule: 'required',
                errorMsg: 'email is required'
            }, {
                rule: function(val) {
                    return new Promise(resolve => {
                        setTimeout(function() {
                            resolve(val === 'hello')
                        }, 1000)
                    })
                },
                errorMsg: 'not an email'
            }, {
                rule: 'maxlength',
                params: 10,
                errorMsg: 'too long'
            }]
        }).then(function(result) {
            const errors = result.getErrors()
            expect(false).toEqual(result.ok())
            expect('not an email').toEqual(errors[0].message)
            expect('too long').toEqual(errors[1].message)
            done()
        })
    })
})
