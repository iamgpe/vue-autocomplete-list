import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'VueAutocompleteList',
    exports: 'named',
    format: 'cjs'
  },
  plugins: [
    commonjs({
      include: 'node_modules'
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble(),
  ]
}