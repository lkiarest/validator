describe("[user defined rules]", function() {
    it("test user defined", function() {
        const result = validator.validate({
            desc: 'hello world'
        }, {
            desc: {
                rule: function(val) {
                    return val.indexOf('hello') > -1
                },
                errorMsg: 'must contain hello'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test user defined with params", function() {
        const result = validator.validate({
            desc: 'hello world'
        }, {
            desc: {
                rule: function(val, str) {
                    return val.indexOf(str) > -1
                },
                params: 'hello',
                errorMsg: 'must contain hello'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test rule register", function() {
        validator.register({
            name: 'contain',
            validate: function(val, str) {
                return val.indexOf(str) > -1
            }
        })

        const result = validator.validate({
            desc: 'hello world'
        }, {
            desc: {
                rule: 'contain',
                params: 'hello',
                errorMsg: 'must contain hello'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test mulitiple rules", function() {
        const result = validator.validate({
            name: '',
            desc: 'hello world'
        }, {
            name: {
                rule: 'required',
                errorMsg: 'name is required'
            },
            desc: {
                rule: function(val) {
                    return val.indexOf('hello') > -1
                },
                errorMsg: 'your description must contain hello'
            }
        })

        expect(false).toEqual(result.success)
        expect('name is required').toEqual(result.errors[0].message)
    })
})