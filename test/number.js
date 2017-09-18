describe('[number check]', function() {
    it('correct number', function() {
        const result = validator.validate({
            age: 122
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(true).toEqual(result.success)
    })

    it('correct number string', function() {
        const result = validator.validate({
            age: '122'
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(true).toEqual(result.success)
    })

    it('incorrect number string', function() {
        const result = validator.validate({
            age: '122a'
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(false).toEqual(result.success)
        expect('not a number').toEqual(result.errors[0].message)
    })

    it('incorrect number Infinity', function() {
        const result = validator.validate({
            age: Infinity
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(false).toEqual(result.success)
        expect('not a number').toEqual(result.errors[0].message)
    })

    it('test null', function() {
        const result = validator.validate({
            age: null
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(false).toEqual(result.success)
        expect('not a number').toEqual(result.errors[0].message)
    })

    it('test empty string', function() {
        const result = validator.validate({
            age: ''
        }, {
            age: {
                rule: 'number',
                errorMsg: 'not a number'
            }
        })

        expect(false).toEqual(result.success)
        expect('not a number').toEqual(result.errors[0].message)
    })
})