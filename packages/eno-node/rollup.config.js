import typescript from 'rollup-plugin-typescript2';

export default {
  input: "./src/index.ts",
  output: [
    {
      file: 'dist/cli.mjs',
      format: 'cjs',
      exports: 'named'
    },
    // {
    //   file: 'dist/bundle.esm.js',
    //   format: 'esm'
    // }
  ],
  plugins: [typescript()]
}