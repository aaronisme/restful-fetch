import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel';
import { format } from 'path';

export default {
    input: 'src/api.js',
    output: {
        file: 'dist/restful-fetch.bundle.js',
        format: 'umd',
        name: 'restful-fetch'
    },
    plugins:[
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        })
    ],
    external: ['lodash/includes','es6-promise','isomorphic-fetch']
}