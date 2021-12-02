# minifaker

Generate fake data.  
An alternative to faker.js but with cjs or esm syntax
<https://github.com/Marak/faker.js>

## NPM

`npm i minifaker`

## Supported locales

`en` | `fr`, `fr-CA` | `es`

## Why

faker.js is too big and it's not currently supporting tree shaking.
<https://github.com/Marak/faker.js/issues/785>

### Why not create a pull request to faker.js?

Supporting ES6 modules for faker.js would need a big restructure change.

Right now, I just need a couple of functions and it's faster to create a new package mirroring functions without having to do a lot of refactoring. However, importing the entire package will take work and time, but at least I can start using it without having to finish it.

I also want to use Typescript and introduce new functions.

### Better function alternatives

I will deprecate functions with better alternatives.

- instead of `uuid()` use `npm i nanoid` to generate string ID
- instead of `lorem()` use `npm i lorem-ipsum` to generate lorem words  
- instead of `password()` use `npm i generate-password` to generate unique passwords

### Duplicates

I've notice that faker locales have duplicate words :S.  
I'll try fix the duplicates when importing locale files to reduce size as much as possible.

## Example / usage

### Using functions

```ts
// You can either import minifaker completely 
// or import the functions you need
import minifaker, { arrayElement } from 'minifaker'
// const minifaker = require('minifaker')

minifaker.number()
arrayElement(['one', 'two', 'three'])
```

### Using locale dependent functions

```ts
import minifaker, { cityName, Gender } from 'minifaker'
// There is no default locale import (not even `english`)
import 'minifaker/dist/locales/en' // the first locale import is set as default
import 'minifaker/dist/locales/fr'

minifaker.firstName({ gender: Gender.FEMALE }) // female name in english
cityName({ locale: 'fr' }) // french city name
```

### Generating a list of 50 english names

```ts
import { array, name } from 'minifaker'
import 'minifaker/dist/locales/en'

array(50, () => name())
```

## Function mapping

|Faker.js|Locales|Func|
|-|-|-|
arrayElement|n/a|arrayElement
number,float|n/a|number
boolean|n/a|boolean
uuid|n/a|use `nanoid`
firstName|en,fr|firstName
phoneNumber|en,fr,fr-CA|phoneNumber
cityName|en,fr|cityName
cityPrefix|en|cityPrefix
citySuffix|en|citySufix
imageUrl|n/a|imageUrlFromPlaceIMG
imageUrl|n/a|imageUrlFromPlaceholder
lorem|n/a|use `lorem-ipsum`
objectElement|n/a|objectElement
n/a|n/a|array
lastName|en,fr|lastName
jobTitle|en|jobTitle
jobArea|en|jobArea
jobDescriptor|en|jobDescriptor
jobType|en,fr|jobType
name|en,fr|name
ip|n/a|ip
port|n/a|port
adjective,adverb,conjunction,  interjection,noun,preposition,verb|en|word
ipv6|n/a|ipv6
color|n/a|color
username|en,fr|username
mac|n/a|macAddress
domainName|en,fr,fr-CA|domainName
domainSuffix|en,fr,fr-CA|domainSuffix
email|en,fr,fr-CA|email
url|en,fr,fr-CA|domainUrl
zipCode|en,fr,fr-CA|zipCode
streetPrefix|fr|streetPrefix
streetSuffix|en,fr|streetSuffix
streetName|en,fr|streetName
streetAddress|en,fr|streetAddress
timeZone|en|timeZone
latidude|n/a|latidude
longitude|n/a|longitude
n/a|n/a|latLong
direction,cardinalDirection,ordinalDirection|en,fr|direction
state,stateAbbr|en,fr,fr-CA|state
country,countryCode|en,fr|country
price|all|price with `Intl.NumberFormat`
creditCardNumber|n/a|creditCardNumber
creditCardCVV|n/a|creditCardCVV
semver|n/a|semver
password|n/a|use `generate-password`
month|en,fr|month
weekday|en,fr|weekday
date|all|date
bitcoinAddress|n/a|bitcoinAddress
fileExt,commonFileExt|n/a|fileExt
fileName,commonFileName|en|fileName
filePath|en|filePath
mimeType,commonMimeType|n/a|mimeType
dirPath|n/a|dirPath
seed|n/a|setSeed
