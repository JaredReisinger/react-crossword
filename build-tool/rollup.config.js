import path from 'path';
import glob from 'glob';
import nodeResolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { camelize } from 'inflected';

const { pkg, fromRoot, extensions } = require('./utils');

const here = p => path.join(__dirname, p);

const format = process.env.BUILD_FORMAT;
const useSizeSnapshot = process.env.BUILD_SIZE_SNAPSHOT || false;
const minify = process.env.BUILD_MINIFY || false;

const umd = format === 'umd';
const esm = format === 'esm';

const globals = Object.keys(pkg.peerDependencies || {}).reduce((deps, dep) => {
  deps[dep] = camelize(dep);
  return deps;
}, {});

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const external = umd ? peerDeps : deps.concat(peerDeps);

const externalPattern = new RegExp(`^(${external.join('|')})($|/)`);
const externalPredicate =
  external.length === 0 ? () => false : id => externalPattern.test(id);

const filename = [pkg.name, `.${format}`, minify ? '.min' : null, '.js']
  .filter(Boolean)
  .join('');

const omit = (obj, key) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};
const replacements = Object.entries(
  umd ? process.env : omit(process.env, ['NODE_ENV'])
).reduce((acc, [key, value]) => {
  let val;
  if (value === 'true' || value === 'false' || Number.isInteger(+value)) {
    val = value;
  } else {
    val = JSON.stringify(value);
  }
  acc[`process.env.${key}`] = val;
  return acc;
}, {});

const input = glob.sync(fromRoot(process.env.BUILD_INPUT || 'src/index.js'));
if (input.length > 1) {
  throw new Error(
    "This build doesn't support more than one entry point, since rollup's support for this is not very satisfying"
  );
}
const output = [
  {
    name: pkg.name,
    file: path.join('dist', filename),
    format: esm ? 'es' : format,
    exports: esm || umd ? 'named' : 'auto',
    globals: umd ? globals : {},
  },
];

export default {
  input: input[0],
  output,
  plugins: [
    peerDepsExternal(),
    nodeResolve({ mainFields: ['jsnext', 'main'], browser: true, extensions }),
    commonjs({ include: 'node_modules/**' }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code,
      runtimeHelpers: true,
      presets: [here('babelrc.umd.js')],
      extensions,
    }),
    replace(replacements),
    minify ? terser() : null,
    useSizeSnapshot ? sizeSnapshot({ printInfo: false }) : null,
  ].filter(Boolean),
  external: externalPredicate,
};
