import typescript from 'rollup-plugin-typescript2';

export default {
    external: ['rxjs', 'react'],
    input: './src/rxflux/index.ts',
    plugins: [
        typescript()
    ],
    output: {
        file: './dist/rxflux/index.js',
        format: 'cjs'
    }
}