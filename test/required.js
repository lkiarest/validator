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

    it("require an empty string",function(){
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

    it("require string of spaces",function(){
        const result = validator.validate({
            name: '  '
        }, {
            name: {
                rule: 'required',
                params: true, // set trim as true
                errorMsg: 'name is required'
            }
        })

        expect(false).toEqual(result.success)
        expect('name is required').toEqual(result.errors[0].message)
    })

    it("test trim",function(){
        const result = validator.validate({
            name: ' aaa '
        }, {
            name: {
                rule: 'required',
                params: true, // set trim as true
                errorMsg: 'name is required'
            }
        })

        expect(true).toEqual(result.success)
    })

    it("require null object",function(){
        const result = validator.validate({
            name: null
        }, {
            name: {
                rule: 'required',
                params: true, // set trim as true
                errorMsg: 'name is required'
            }
        })

        expect(false).toEqual(result.success)
        expect('name is required').toEqual(result.errors[0].message)
    })

    it("require undefined object",function(){
        const result = validator.validate({
            name: undefined
        }, {
            name: {
                rule: 'required',
                params: true, // set trim as true
                errorMsg: 'name is required'
            }
        })

        expect(false).toEqual(result.success)
        expect('name is required').toEqual(result.errors[0].message)
    })

    it("require zero",function(){
        const result = validator.validate({
            name: 0
        }, {
            name: {
                rule: 'required',
                params: true, // set trim as true
                errorMsg: 'name is required'
            }
        })

        expect(true).toEqual(result.success)
    })
})
