require('babel-register')
const rollup = require('rollup')

const rulesBuild = require('./rulesBuild')
const config = require('./config')

const inputOptions = {
    input: config.input,
    plugins: config.plugins
}
const outputOptions = config.output
// const watchOptions = config.watch

// build tmp rules file
rulesBuild.build()

const watch = () => {
    // watch
    const watcher = rollup.watch(config)

    watcher.on('event', (e) => {
        switch (e.code) {
            case 'BUNDLE_START': {
                console.log('rebuild')
                break
            }
        }
    })
}

async function build() {
    const bundle = await rollup.rollup(inputOptions)
    await bundle.write(config.output)
    console.log('build successfully !')

    // watch()
}

build()

