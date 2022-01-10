// Can't create a test because it does not support NPM exports
// https://github.com/facebook/jest/issues/9771

// ts-node ./test/yalc.package.ts

import minifaker from 'minifaker'
import 'minifaker/locales/en'
import 'minifaker/locales/fr'
import 'minifaker/locales/fr-CA'
import 'minifaker/locales/es'

console.log(minifaker.word())
