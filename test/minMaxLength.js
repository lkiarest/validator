describe("[min & max length check]", function() {
    it("test maxlength correct",function(){
        const result = validator.validate({
            desc: 'aaa'
        }, {
            desc: {
                rule: 'maxlength',
                params: 5,
                errorMsg: 'too long'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test maxlength error",function(){
        const result = validator.validate({
            desc: 'aaaaaa'
        }, {
            desc: {
                rule: 'maxlength',
                params: 5,
                errorMsg: 'too long'
            }
        })

        expect(false).toEqual(result.success)
        expect('too long').toEqual(result.errors[0].message)
    })

    it("test minlength correct",function(){
        const result = validator.validate({
            desc: 'aaaaa'
        }, {
            desc: {
                rule: 'minlength',
                params: 5,
                errorMsg: 'too short'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test minlength error",function(){
        const result = validator.validate({
            desc: 'aaaa'
        }, {
            desc: {
                rule: 'minlength',
                params: 5,
                errorMsg: 'too short'
            }
        })

        expect(false).toEqual(result.success)
        expect('too short').toEqual(result.errors[0].message)
    })
})
