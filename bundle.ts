import * as esbuild from 'esbuild'

const config = {
  entryPoints: [
    './src/index.ts',
    './src/locales/en/index.ts',
    './src/locales/fr/index.ts',
    './src/locales/fr-CA/index.ts',
    './src/locales/es/index.ts'
  ],
  platform: 'node',
  bundle: true
} as esbuild.BuildOptions

const formats = {
  'esm': '.mjs',
  'cjs': '.js'
} as { [key in esbuild.Format]: string }

Object.keys(formats).forEach(key => {
  const extension = formats[key]
  esbuild.build({
    ...config,
    format: key as esbuild.Format,
    outExtension: { '.js': extension },
    outdir: `./dist`
  })
})
