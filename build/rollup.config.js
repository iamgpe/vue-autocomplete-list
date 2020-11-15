import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import bubble from '@rollup/plugin-buble';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'VueAutocompleteList',
    exports: 'named',
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    bubble(),
  ],
};