describe("[email check]", function() {
    it("test email",function(){
        const result = validator.validate({
            email: 'aa@test.com'
        }, {
            email: {
                rule: 'email',
                errorMsg: 'not an email'
            }
        })

        expect(true).toEqual(result.ok())
    })

    it("test email with complex format",function(){
        const result = validator.validate({
            email: 'a_b1@test.com.cn'
        }, {
            email: {
                rule: 'email',
                errorMsg: 'not an email'
            }
        })

        expect(true).toEqual(result.ok())
    })

    it("test email with invalid name",function(){
        const result = validator.validate({
            email: '@test.com.cn'
        }, {
            email: {
                rule: 'email',
                errorMsg: 'not an email'
            }
        })

        expect(false).toEqual(result.ok())
        expect('not an email').toEqual(result.getFirstError().message)
    })

    it("test email with invalid suffix",function(){
        const result = validator.validate({
            email: 'aaaa@'
        }, {
            email: {
                rule: 'email',
                errorMsg: 'not an email'
            }
        })

        expect(false).toEqual(result.ok())
        expect('not an email').toEqual(result.getFirstError().message)
    })

    it("test email without @",function(){
        const result = validator.validate({
            email: 'aaaabbb.com.cn'
        }, {
            email: {
                rule: 'email',
                errorMsg: 'not an email'
            }
        })

        expect(false).toEqual(result.ok())
        expect('not an email').toEqual(result.getFirstError().message)
    })
})
