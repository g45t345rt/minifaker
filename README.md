# minifaker

Generate fake data.  
An alternative to faker.js with cjs or esm syntax

## npm

`npm i minifaker`

## why

faker.js is too big and there is no tree shaking.
<https://github.com/Marak/faker.js/issues/785>

### why not create a pull request to faker.js?

Too much work to make it all work in one pull request. Instead, I will be adding new functions here from time to time.

## Example / usage

### Using functions

```ts
// You can either import minifaker completely or import the functions you need
import minifaker, { arrayElement } from 'minifaker'

minifaker.number()
arrayElement(['one', 'two', 'three'])
```

### Using locale dependent functions

```ts
import minifaker, { cityName } from 'minifaker'
import 'minifaker/dist/locale/en' // first import is set a default locale
import 'minifaker/dist/locale/fr'

minifaker.firstName({ gender: 'female' }) // female name in english
cityName({ locale: 'fr' }) // french city name
```

## functions

|Function|Locale|Faker.js|
|-|-|-|
|arrayElement|n/a|arrayElement
|number,float|n/a|number
|boolean|n/a|boolean
|firstName|en,fr|firstName
|phoneNumber|en,fr,fr_CA|phoneNumber
|cityName|en,fr|cityName
|cityPrefix|en,fr|cityPrefix
|citySufix|en,fr|citySufix
