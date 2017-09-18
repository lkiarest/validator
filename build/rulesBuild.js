const path = require('path')
const fs = require('fs')

const DIR_RULES = path.resolve(__dirname, '../src/rules')
const DIR_TARGET = path.resolve(__dirname, './tmpRules.js')

const build = () => {
    const ruleNames = []
    const importLines = []

    fs.readdirSync(DIR_RULES).forEach(fileName => {
        const name = fileName.split('.')[0]
        ruleNames.push(name)
        importLines.push(`import ${name} from '../src/rules/${name}'`)
    })

    const importCode = importLines.join('\n')
    const rulesCode = ruleNames.join(',')
    const result = `${importCode}\nexport default {\n${rulesCode}\n}`

    fs.writeFileSync(DIR_TARGET, result, 'utf-8')
}

module.exports = {build}
