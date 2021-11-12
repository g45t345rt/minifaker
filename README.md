# minifaker

Generate fake data.
An alternative to faker.js with cjs or esm syntax

## npm

`npm i minifaker`

## why

faker.js is too big and there is no tree shaking.
<https://github.com/Marak/faker.js/issues/785>

### why not create a pull request to faker.js?

Too much work. I will be adding new functions here from time to time.

## how to use

```ts
import minifaker from 'minifaker'
import 'minifaker/locale/en' // you don't need to import locale if you're not using any locale dependent functions

// const minifaker = require('minifaker')
// require('minifaker/locale/en')

minifaker.firstName()
```

## functions

|Function|Locale|Faker.js|
|-|-|-|
|arrayElement|n/a|arrayElement
|randomNumber|n/a|number|
|firstName|en,fr|firstName
|phoneNumber|en,fr,fr_CA|phoneNumber
