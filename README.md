# A light weight js object validator
Very easy to use and extend check rules of your own

### supported rules (on development)
email, max, maxlength, min, minlength, number, regex, required

### install
```shell
    npm install uvalidator # yarn add uvalidator
```

### basic usage
```javascript
    import validator from 'uvalidator'

    // if we have a 'user' property to check
    const rules = {
        user: {
            rule: 'required', // pre-defined rule
            errorMsg: 'user is required'
        }
    }

    let result = validator.validate({
        user: 'lily'
    }, rules)
    // ok !
    result.ok() === true

    result = validator.validate({
        user: ''
    }, rules)
    // failed !
    result.ok() === false
    result.getErrors() = [{name: 'user', message: 'name is required'}]
```

### with dynamic params
```javascript
    const rules = {
        username: {
            rule: 'maxlength',
            params: 5,
            errorMsg: 'username is too long'
        }
    }

    // return {success: false, errors: [{name: 'username', messag: 'username is too long'}]}
    validator.validate({
        username: 'aaaaaa'
    }, rules)
```

### user defined rule
```javascript
    /// your can register several rules in an array either
    validator.register({ // add a rule named 'contain' to check sub string
        name: 'contain',
        validate: function(val, str) {
            return val && val.indexOf(str) > -1
        }
    })

    const rules = {
        desc: {
            rule: 'contain',
            params: 'hello',
            errorMsg: 'your description must contain hello'
        }
    }

    // {success: true}
    const result = validator.validate({
        desc: 'hello world'
    }, rules)
```

### add dynamic rule
```javascript
    const rules = {
        name: {
            rule: 'required',
            errorMsg: 'name is required'
        },
        desc: {
            rule: function(val) { // define the check funtion
                return val.indexOf('hello') > -1
            },
            errorMsg: 'your description must contain hello'
        }
    }

    const result = validator.validate({
        name: '',
        desc: 'hello world'
    }, rules)
```
