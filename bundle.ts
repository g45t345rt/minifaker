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
  bundle: true,
  external: [
    '*/../index', // for accessing minifaker in locales folder
    // keep them as external since they might already be installed... I can't really bundle them because I don't have the TS file generated :S
    'nanoid',
    'uuid',
    'generate-password'
    //'seedrandom' // bundle seedrandom inside instead since we only we it internally
  ]
} as esbuild.BuildOptions

const formats = ['cjs', 'esm'] as esbuild.Format[]

formats.forEach(format => {
  esbuild.build({
    ...config,
    format,
    outdir: `./dist/${format}`
  })
})
