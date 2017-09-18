describe("[min & max number check]", function() {
    it("test max correct",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'max',
                params: 56,
                errorMsg: 'too small'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test max correct",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'max',
                params: 55,
                errorMsg: 'too small'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test min correct",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'min',
                params: 50,
                errorMsg: 'too small'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test min correct",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'min',
                params: 55,
                errorMsg: 'too small'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("test max error",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'max',
                params: 54,
                errorMsg: 'too large'
            }
        })

        expect(false).toEqual(result.success)
        expect('too large').toEqual(result.errors[0].message)
    })

    it("test min error",function(){
        const result = validator.validate({
            desc: '55'
        }, {
            desc: {
                rule: 'min',
                params: 56,
                errorMsg: 'too small'
            }
        })

        expect(false).toEqual(result.success)
        expect('too small').toEqual(result.errors[0].message)
    })
})