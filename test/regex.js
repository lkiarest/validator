describe("[regex]", function() {
    it("float check",function(){
        const result = validator.validate({
            money: '1.23'
        }, {
            money: {
                rule: 'regex',
                params: '^\\d+\\.\\d{2}',
                errorMsg: 'money is valid'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("email check",function(){
        const result = validator.validate({
            email: 'aa@test.com.cn'
        }, {
            email: {
                rule: 'regex',
                params: '^[0-9a-zA-Z_]+@\\w+\\.\\w+',
                errorMsg: 'email is valid'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("incorrect email check",function(){
        const result = validator.validate({
            email: 'this is an email'
        }, {
            email: {
                rule: 'regex',
                params: '^[0-9a-zA-Z_]+@\\w+\\.\\w+',
                errorMsg: 'email is valid'
            }
        })

        expect(false).toEqual(result.success)
        expect('email is valid').toEqual(result.errors[0].message)
    })
})