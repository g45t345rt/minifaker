# minifaker

Generate fake data.  
An alternative to faker.js but with cjs or esm syntax
<https://github.com/Marak/faker.js>

## NPM

`npm i minifaker`

## Why

faker.js is too big and it's not currently supporting tree shaking.
<https://github.com/Marak/faker.js/issues/785>

### Why not create a pull request to faker.js?

Supporting ES6 modules for faker.js would need a big restructure change.

Right now, I just need a couple of functions and it's faster to create a new package mirroring functions without having to do a lot of refactoring. However, importing the entire package will take work and time, but at least I can start using it without having to finish it.

I also want to use Typescript and introduce new functions.

### Better function alternatives

I will deprecate functions with better alternatives.

- use `npm i nanoid` to generate string ID
- use `npm i lorem-ipsum` to generate lorem words  

### Duplicates

I've notice that faker locales have duplicate words :S.  
I'll try fix the duplicates when importing locale files to reduce size as much as possible.

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
import minifaker, { cityName, Gender } from 'minifaker'
import 'minifaker/dist/locales/en' // first import is set a default locale
import 'minifaker/dist/locales/fr'

minifaker.firstName({ gender: Gender.FEMALE }) // female name in english
cityName({ locale: 'fr' }) // french city name
```

## Function mapping

|Faker.js|Locales|Func|
|-|-|-|
|arrayElement|n/a|arrayElement
|number,float|n/a|number
|boolean|n/a|boolean
|uuid|n/a|use `nanoid`
|firstName|en,fr|firstName
|phoneNumber|en,fr,fr_CA|phoneNumber
|cityName|en,fr|cityName
|cityPrefix|en|cityPrefix
|citySufix|en|citySufix
|imageUrl|n/a|imageUrlFromPlaceIMG
|imageUrl|n/a|imageUrlFromPlaceholder
|lorem|n/a|use `lorem-ipsum`
|objectElement|n/a|objectElement
|n/a|n/a|array
|lastName|en,fr|lastName
|jobTitle|en|jobTitle
|jobArea|en|jobArea
|jobDescriptor|en|jobDescriptor
|jobType|en,fr|jobType
