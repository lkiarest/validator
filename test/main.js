describe("[test required]", function() {
    it("require a string",function(){
        const result = validator.validate({
            name: 'qtx'
        }, {
            name: {
                rule: 'required',
                errorMsg: 'name is required'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("require a empty string",function(){
        const result = validator.validate({
            name: ''
        }, {
            name: {
                rule: 'required',
                errorMsg: 'name is required'
            }
        })

        expect(false).toEqual(result.success)
        expect('name is required').toEqual(result.errors[0].message)
    })
})
