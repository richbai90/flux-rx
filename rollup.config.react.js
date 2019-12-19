import typescript from 'rollup-plugin-typescript2';

export default {
    external: ['rxjs', 'react'],
    input: './src/rxflux-react/index.ts',
    plugins: [
        typescript()
    ],
    output: {
        file: './dist/rxflux-react/index.js',
        format: 'cjs'
    }
}