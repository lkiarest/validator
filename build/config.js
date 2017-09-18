const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const path = require('path')

module.exports = {
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    file: path.resolve(__dirname, '../lib/index.js'),
    name: 'validator',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ],
  watch: {
    include: ['src/**'],
    exclude: 'node_modules/**'
  },
  sourcemap: true
}
