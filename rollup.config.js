import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            name: 'fontface',
        },
    ],
    plugins: [
        sourcemaps(),
        nodeResolve(),
        commonJs(),
    ]
}