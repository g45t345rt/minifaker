# minifaker

Generate fake data.  
An alternative to faker.js but with cjs or esm syntax

## NPM

`npm i minifaker`

## Why

faker.js is too big and there is no tree shaking.
<https://github.com/Marak/faker.js/issues/785>

### Why not create a pull request to faker.js?

Too much work to get the pull request denied. Instead, I will be adding new functions here from time to time.
I will deprecate functions with better alternatives.
For example, use `nanoid` to generate string ID

## Example / usage

### Using functions

```ts
// You can either import minifaker completely or import the functions you need
import minifaker, { arrayElement } from 'minifaker'
// const minifaker = require('minifaker')

minifaker.number()
arrayElement(['one', 'two', 'three'])
```

### Using locale dependent functions

```ts
import minifaker, { cityName } from 'minifaker'
import 'minifaker/dist/locales/en' // first import is set a default locale
import 'minifaker/dist/locales/fr'

minifaker.firstName({ gender: 'female' }) // female name in english
cityName({ locale: 'fr' }) // french city name
```

## Function mapping

|Function|Locales|Faker.js|
|-|-|-|
|arrayElement|n/a|arrayElement
|number|n/a|number,float
|boolean|n/a|boolean
|use `nanoid`|n/a|uuid
|firstName|en,fr|firstName
|phoneNumber|en,fr,fr_CA|phoneNumber
|cityName|en,fr|cityName
|cityPrefix|en,fr|cityPrefix
|citySufix|en,fr|citySufix
|imageUrlFromPlaceIMG, imageUrlFromPlaceholder|n/a|imageUrl
