// Packages
import _seedrandom from 'seedrandom' // seedrandom().quick() is 1.8x faster than native Math.random() + I can set a seed :)
import * as _nanoid from 'nanoid'
import * as _nanoid_nonsecure from 'nanoid/non-secure'
import * as _uuid from 'uuid'

// Helpers and data
import creditCardProviders from './data/creditCardProviders'
import checkLuhn from './helpers/checkLuhn'
import { replaceRangeSymbols, replaceSymbols } from './helpers/replaceStrings'
import dirPaths from './data/dirPaths'
import commonMimeTypes from './data/commonMimeTypes'
import chars from './data/chars'

// https://stackoverflow.com/questions/61047551/typescript-union-of-string-and-string-literals
type Locale = (string & {}) | 'en' | 'fr' | 'fr-CA' | 'es' // we need intellisense for locales but also want any type of string for custom locale

const locales = {}
let defaultLocale = null
let random = _seedrandom()

const throwNoDefaultLocale = () => {
  throw new Error(`No default locale defined. Import at least one locale!`)
}

const throwNoLocale = (locale) => {
  throw new Error(`The locale [${locale}] is not imported or supported.`)
}

const throwNoLocaleData = (locale: Locale, key: string) => {
  throw new Error(`The locale [${locale}] data of [${key}] doest not exists. Mostly not implemented yet!.`)
}

const setSeed = (seed: string) => {
  random = _seedrandom(seed)
}

const getLocaleData = <T>({ locale: _locale, key }: { locale?: Locale, key: string }): T => {
  if (!defaultLocale) throwNoDefaultLocale()

  const locale = _locale || defaultLocale
  if (!locales[locale]) throwNoLocale(locale)

  const localeData = locales[locale]
  if (!localeData[key]) throwNoLocaleData(locale, key)
  return localeData[key]
}

export const nanoId = _nanoid
export const nonsecure = _nanoid_nonsecure
export const uuid = _uuid

export const addLocale = (name: string, localeData) => {
  const noLocales = Object.keys(locales).length === 0
  locales[name] = localeData
  if (noLocales) setDefaultLocale(name)
}

export const setDefaultLocale = (locale: Locale) => {
  if (!locales[locale]) throwNoLocale(locale)
  defaultLocale = locale
}

export const number = (options: { min?: number, max?: number, float?: boolean } = {}): number => {
  const { min, max, float } = { min: 0, max: 1, float: false, ...options }
  const value = min + random.quick() * (max - min)
  if (!float) return Math.round(value)
  return value
}

export const boolean = () => {
  return !!number({ max: 1 })
}

export const arrayElement = <T>(array: T[]): T => {
  return array[number({ max: array.length - 1 })]
}

export const array = <T>(count: number, cb: (index: number) => T): T[] => {
  let newArray = []
  for (let i = 0; i < count; i++) {
    newArray = [...newArray, cb(i)]
  }
  return newArray
}

export const objectElement = (obj: any): { key: string, value: unknown } => {
  if (typeof obj !== 'object' || Array.isArray(obj)) throw new Error(`obj must be an object.`)
  const keys = Object.keys(obj)
  const key = arrayElement(keys)
  return { key, value: obj[key] }
}

type Gender = 'male' | 'female'

export const firstName = (options: { locale?: Locale, gender?: Gender } = {}) => {
  const { locale, gender } = options
  switch (gender) {
    case 'female':
      const femaleFirstNames = getLocaleData<string[]>({ locale, key: 'femaleFirstNames' })
      return arrayElement(femaleFirstNames)
    case 'male':
      const maleFirstNames = getLocaleData<string[]>({ locale, key: 'maleFirstNames' })
      return arrayElement(maleFirstNames)
    default:
      const firstNames = getLocaleData<string[]>({ locale, key: 'firstNames' })
      return arrayElement(firstNames)
  }
}

export const phoneNumber = (options: { locale?: Locale, formats?: string[] } = {}) => {
  const { locale, formats } = options
  const phoneFormats = formats || getLocaleData<string[]>({ locale, key: 'phoneFormats' })
  return arrayElement(phoneFormats).split('').map((c) => {
    if (c === '#') return number({ max: 9 })
    return c
  }).join('')
}

export const cityName = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const cityNames = getLocaleData<string[]>({ locale, key: 'cityNames' })
  return arrayElement(cityNames)
}

export const cityPrefix = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const cityPrefixes = getLocaleData<string[]>({ locale, key: 'cityPrefixes' })
  return arrayElement<string>(cityPrefixes)
}

export const citySuffix = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const citySuffixes = getLocaleData<string[]>({ locale, key: 'citySuffixes' })
  return arrayElement<string>(citySuffixes)
}

type PlaceImgCategory = 'any' | 'animals' | 'architecture' | 'nature' | 'people' | 'tech'
type PlaceImgFilter = 'grayscale' | 'sepia'

export const imageUrlFromPlaceIMG = (options: { width: number, height: number, category?: PlaceImgCategory, filter?: PlaceImgFilter }) => {
  const { width, height, category, filter } = { category: 'any', ...options }
  const url = `https://placeimg.com/${width}/${height}/${category}`
  if (filter) url + `/${filter}`
  return url
}

export const imageUrlFromPlaceholder = (options: { width: number, height?: number, backColor?: string, textColor?: string, textValue?: string }) => {
  const { width, height, backColor, textColor, textValue } = options
  let url = `https://via.placeholder.com/${width}`
  if (height) url + `x${height}`
  if (backColor) url + `/${backColor}`
  if (textColor) url + `/${textColor}`
  if (textValue) url + `?text=${textValue}`
  return url
}

export const lastName = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const lastNames = getLocaleData<string[]>({ locale, key: 'lastNames' })
  return arrayElement(lastNames)
}

export const name = (options?: { locale?: Locale, gender?: Gender }) => {
  return `${firstName(options)} ${lastName(options)}`
}

export const jobTitle = (options?: { locale?: Locale }) => {
  return `${jobDescriptor(options)} ${jobArea(options)} ${jobType(options)}`
}

export const jobType = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const jobTypes = getLocaleData<string[]>({ locale, key: 'jobTypes' })
  return arrayElement(jobTypes)
}

export const jobArea = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const jobLevels = getLocaleData<string[]>({ locale, key: 'jobLevels' })
  return arrayElement(jobLevels)
}

export const jobDescriptor = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const jobDescriptors = getLocaleData<string[]>({ locale, key: 'jobDescriptors' })
  return arrayElement(jobDescriptors)
}

export const ip = () => {
  return array(4, () => number({ max: 255 })).join('.')
}

export const port = (): number => {
  return number({ max: 65535 })
}

export const ipv6 = () => {
  return array(8, () => number({ max: 65535 }).toString(16)).join(':')
}

const hexPadLeft = (value: string) => {
  if (value.length === 1) return `0${value}`
  return value
}

export const color = (options: { r?: number, g?: number, b?: number } = {}) => {
  const { r, g, b } = options

  const red = (r || number({ max: 256 })).toString(16)
  const green = (g || number({ max: 256 })).toString(16)
  const blue = (b || number({ max: 256 })).toString(16)
  return `#${hexPadLeft(red)}${hexPadLeft(green)}${hexPadLeft(blue)}`
}

export const hex = (count: number = 1) => {
  let hexString = ''
  array(count, () => hexString += number({ max: 15 }).toString(16))
  return `0x${hexString}` // 0x is the prefix used to denote hexadecimal
}

type WordType = 'verb' | 'preposition' | 'noun' | 'interjection' | 'conjunction' | 'adverb' | 'adjective'

export const word = (options: { locale?: Locale, type?: WordType, filter?: (word: string) => void } = {}) => {
  const { type, locale, filter } = options
  const _type = type || arrayElement(Object.values(['verb', 'preposition', 'noun', 'interjection', 'conjunction', 'adverb', 'adjective']))
  const adjectives = getLocaleData<string[]>({ locale, key: `${_type}s` })
  if (typeof filter === 'function') return arrayElement(adjectives.filter(filter))
  return arrayElement(adjectives)
}

export const username = (options: { locale?: Locale, type?: number, firstName?: string, lastName?: string } = {}) => {
  const { locale, type: _type, firstName: _firstName, lastName: _lastName } = options

  const newFirstName = _firstName || firstName({ locale })
  const newLastName = _lastName || lastName({ locale })
  const type = typeof _type !== 'undefined' ? _type : number({ max: 2 })

  switch (type) {
    case 0:
      return newFirstName + number({ max: 99 })
    case 1:
      return newFirstName + arrayElement(['.', '_']) + newLastName
    case 2:
      return newFirstName + arrayElement(['.', '_']) + newLastName + number({ max: 99 })
  }
}

type MacAddressSeparator = '' | '.' | ':' | '-' | ' '
type MacAddressTransmission = 'unicast' | 'multicast'
type MacAddressAdministration = 'laa' | 'uaa' // laa = locally administere | uaa = globally unique (oui enforced)

// TODO: EUI64 address -- https://kwallaceccie.mykajabi.com/blog/how-to-calculate-an-eui-64-address
export const macAddress = (options: {
  separator?: MacAddressSeparator,
  transmission?: MacAddressTransmission,
  administration?: MacAddressAdministration
} = {}) => {
  const { separator = '-', transmission, administration } = options

  const mac = array(6, (index) => {
    let value = number({ max: 255 })

    // https://en.wikipedia.org/wiki/MAC_address#Address_details
    // use first octet to set transmission and administration bits
    if (index === 0) {
      if (transmission === 'multicast')
        value |= 1 << 0 // set bit https://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascript
      else if (transmission === 'unicast')
        value &= ~(1 << 0) // unset bit

      if (administration === 'laa')
        value |= 1 << 1
      else if (administration === 'uaa')
        value &= ~(1 << 1)
    }

    return hexPadLeft(value.toString(16))
  })

  if (separator === '.') {
    let dotMac = ''
    for (let i = 0; i < mac.length; i++) {
      dotMac += mac[i]
      if (i % 2 == 1 && i < mac.length - 1) dotMac += separator
    }
    return dotMac
  }

  return mac.join(separator)
}

export const email = (options: { locale?: Locale, firstName?: string, lastName?: string, provider?: string } = {}) => {
  const { locale, provider: _provider } = options
  const freeEmails = getLocaleData<string[]>({ locale, key: 'freeEmails' })
  const provider = _provider || arrayElement(freeEmails)
  return `${username(options)}@${provider}`
}

export const domainName = (options: { locale?: Locale } = {}) => {
  const { locale } = options

  const name = arrayElement([
    word({ locale, type: 'noun' }),
    firstName({ locale })
  ])

  return `${name.toLowerCase()}.${domainSuffix({ locale })}`
}

export const domainSuffix = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const domainSuffixes = getLocaleData<string[]>({ locale, key: 'domainSuffixes' })
  return arrayElement(domainSuffixes)
}

export const domainUrl = (options: { locale?: Locale } = {}) => `https://${domainName(options)}`

export const zipCode = (options: { locale?: Locale, format?: string } = {}) => {
  const { locale, format: _format } = options

  let format = _format
  if (!format) {
    const formats = getLocaleData<string[]>({ locale, key: 'postCodeFormats' })
    format = arrayElement(formats)
  }

  return replaceSymbols(format)
}

export const streetSuffix = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const streetSuffixes = getLocaleData<string[]>({ locale, key: 'streetSuffixes' })
  return arrayElement(streetSuffixes)
}

export const streetPrefix = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const streetSuffixes = getLocaleData<string[]>({ locale, key: 'streetPrefixes' })
  return arrayElement(streetSuffixes)
}

export const streetName = (options: { locale?: Locale } = {}) => {
  return `${arrayElement([firstName(options), lastName(options)])} ${streetSuffix(options)}`
}

export const streetAddress = (options: { locale?: Locale } = {}) => {
  const streetNumber = array(number({ min: 3, max: 5 }), () => number({ max: 9 })).join('')
  return `${streetNumber} ${streetName(options)}`
}

export const timeZone = (options: { locale?: Locale } = {}) => {
  const { locale } = options
  const timeZones = getLocaleData<string[]>({ locale, key: 'timeZones' })
  return arrayElement(timeZones)
}

export const latidude = () => {
  return number({ min: -90, max: 90, float: true }).toFixed(6)
}

export const longitude = () => {
  return number({ min: -180, max: 180, float: true }).toFixed(6)
}

export const latLong = () => {
  return `${latidude()}, ${longitude()}`
}

type DirectionType = 'cardinal' | 'ordinal'

export const direction = (options: { locale?: Locale, type?: DirectionType, useAbbr?: boolean } = {}) => {
  const { locale, type, useAbbr } = options

  const directions = getLocaleData<{ cardinal: string[][], ordinal: string[][] }>({ locale, key: 'directions' })
  const allDirections = [...directions.cardinal, ...directions.ordinal]
  const mapValue = (value) => useAbbr ? value[1] : value[0]

  if (type) return arrayElement(directions[type].map(mapValue))
  return arrayElement(allDirections.map(mapValue))
}

export const state = (options: { locale?: Locale, useAbbr?: boolean } = {}) => {
  const { locale, useAbbr } = options

  const states = useAbbr ? getLocaleData<string[]>({ locale, key: 'stateAbbrs' }) : getLocaleData<string[]>({ locale, key: 'states' })
  return arrayElement(states)
}

type CountryCodeType = 'alpha2' | 'alpha3'

export const country = (options: { locale?: Locale, useCode?: CountryCodeType } = {}) => {
  const { locale, useCode } = options

  const getLocaleDataKey = () => {
    switch (useCode) {
      case 'alpha2':
        return 'countryCodesAlpha2'
      case 'alpha3':
        return 'countryCodesAlpha3'
      default:
        return 'countries'
    }
  }

  const countries = getLocaleData<string[]>({ locale, key: getLocaleDataKey() })
  return arrayElement(countries)
}

export const price = (options: { locale?: Locale, min?: number, max?: number, currency?: string } = {}) => {
  const { locale: _locale, min, max, currency: _currency } = { min: 0, max: 1000, ...options }
  // don't use getLocaleData since Intl.NumberFormat already support all locales
  const locale = _locale || defaultLocale
  const currency = _currency || (locales[locale] && locales[locale]['defaultCurrency'])
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency })
  return formatter.format(number({ min, max, float: true }))
}

type CreditCardProvider = 'solo' | 'visa' | 'mastercard' | 'maestro' | 'laser' | 'jcb' | 'instapayment' | 'discover' | 'dinersClub' | 'americanExpress'

export const creditCardNumber = (options: { provider?: CreditCardProvider } = {}) => {
  const { provider } = options
  const providerFormats = provider ? creditCardProviders[provider] : Object.values(creditCardProviders).flat()
  let cardNumberFormat = arrayElement<string>(providerFormats)
  cardNumberFormat = replaceSymbols(cardNumberFormat)
  cardNumberFormat = replaceRangeSymbols(cardNumberFormat)

  const cardNumbers = cardNumberFormat.replace(/\D/g, '').split('').map(v => parseInt(v)) // remove all special char keep numbers only

  const luhnNumber = checkLuhn(cardNumbers)
  cardNumberFormat = cardNumberFormat.replace('L', luhnNumber.toString())

  return cardNumberFormat
}

export const creditCardCVV = () => {
  return array(3, () => number({ max: 9 })).join('')
}

export const semver = () => {
  return [number({ max: 9 }), number({ max: 20 }), number({ max: 99 })].join('.')
}

export const month = (options: { locale?: Locale, useAbbr?: boolean } = {}) => {
  const { locale, useAbbr } = options
  const months = getLocaleData<{ wide: string[], abbr: string[] }>({ locale, key: 'months' })
  const { wide, abbr } = months
  return arrayElement(useAbbr ? abbr : wide)
}

export const weekday = (options: { locale?: Locale, useAbbr?: boolean } = {}) => {
  const { locale, useAbbr } = options
  const weekdays = getLocaleData<{ wide: string[], abbr: string[] }>({ locale, key: 'weekdays' })
  const { wide, abbr } = weekdays
  return arrayElement(useAbbr ? abbr : wide)
}

export const date = (options: { from?: Date, to?: Date } = {}) => {
  const { from: _from, to: _to } = options
  const from = _from || new Date(0) // epoch start 1970-01-01
  const to = _to || new Date() // current date

  const fromEpoch = from.getTime()
  const toEpoch = to.getTime()
  return new Date(number({ min: fromEpoch, max: toEpoch }))
}

export const bitcoinAddress = () => {
  const prefix = arrayElement(['1', '3', 'bc1'])
  const count = number({ min: 27, max: 34 })
  const characters = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ' // without 0, O, I, and l.
  return `${prefix}${array(count, () => arrayElement(characters.split(''))).join('')}`
}

// Using commonMimeTypes because it's smaller and we don't need all of them to generate fake data - The full is still in the package but not exported => ./data/mimeType
export const mimeType = () => {
  return arrayElement(Object.values(commonMimeTypes))
}

export const fileExt = () => {
  return arrayElement(Object.keys(commonMimeTypes))
}

export const dirPath = () => {
  return arrayElement(dirPaths)
}

export const fileName = () => {
  const words = array(number({ max: 3 }), () => word())
  return `${words.join('_').toLocaleLowerCase()}${fileExt()}`
}

export const filePath = () => {
  return `${dirPath()}/${fileName()}`
}

interface PasswordOptions {
  maxLength?: number
  minLength?: number
  uppercases?: boolean
  lowercases?: boolean
  numbers?: boolean | number
  symbols?: boolean | number | string
  exclude?: (string & {}) | 'similar'
}

export const password = (options: PasswordOptions = {}) => {
  const { minLength, maxLength, numbers, symbols, uppercases, lowercases } = options

  let passUpercases = true
  if (typeof uppercases === 'boolean') passUpercases = uppercases

  let passLowercases = true
  if (typeof lowercases === 'boolean') passLowercases = lowercases

  if (!passUpercases && !passLowercases) throw new Error(`[uppercases] and [lowercases] can't both be false.`)

  const passMinLength = minLength || 6
  const passMaxLength = maxLength || 10

  const alphabetList = chars.alphabet.split('')
  const numberList = chars.base10.split('')
  let symbolList = chars.passwordSymbols.split('')

  if (passMinLength < 5) throw new Error(`[minLength] must be > 5.`)
  if (passMinLength > passMaxLength) throw new Error(`[minLength] must be <= to [maxLength].`)
  if (passMaxLength < passMinLength) throw new Error(`[maxLength] must be >= to [minLength].`)

  const passLength = number({ min: passMinLength, max: passMaxLength })

  let passNumbers = (typeof numbers === 'boolean' && !numbers) ? 0 : number({ min: 1, max: Math.floor(passMinLength / 2) }) // default to half & half of numbers & characters
  if (typeof numbers === 'number') {
    if (numbers > passMinLength) throw new Error(`[numbers] must be <= to [minLength].`)
    passNumbers = numbers
  }

  let passSymbols = (typeof symbols === 'boolean' && !symbols) ? 0 : 1 // default of one symbol

  if (typeof symbols === 'string') {
    symbolList = symbols.split('')
    passSymbols = symbolList.length
  }

  if (typeof symbols === 'number') {
    passSymbols = symbols
  }

  if (passSymbols + passNumbers > passMinLength) throw new Error(`The sum of [symbols(${passSymbols})] and [numbers(${passNumbers})] must be <= to [minLength(${passMinLength})].`)
  if (passSymbols > passMinLength) throw new Error(`[symbols] must be <= to [minLength]`)

  let types = ['letter', 'number', 'symbol']
  let _passSymbols = 0, _passNumbers = 0

  return array(passLength, () => {
    if (_passNumbers === passNumbers) {
      _passNumbers++ // increment to hit this once
      types.splice(types.indexOf('number'), 1)
    }

    if (_passSymbols === passSymbols) {
      _passSymbols++
      types.splice(types.indexOf('symbol'), 1)
    }

    const charType = types.length === 1 ? types[0] : arrayElement(types)
    if (charType === 'number') {
      _passNumbers++
      return arrayElement(numberList)
    }

    if (charType === 'symbol') {
      _passSymbols++
      return arrayElement(symbolList)
    }

    const letter = arrayElement(alphabetList)
    if (passUpercases && passLowercases) {
      const toUpper = boolean()
      return toUpper ? letter.toUpperCase() : letter
    } else if (passUpercases && !passLowercases) {
      return letter.toUpperCase()
    } else {
      return letter
    }
  }).join('')
}

password({ numbers: 4, symbols: 2 })

export default {
  setDefaultLocale,
  addLocale,
  cityName,
  citySuffix,
  cityPrefix,
  number,
  phoneNumber,
  firstName,
  arrayElement,
  boolean,
  imageUrlFromPlaceIMG,
  imageUrlFromPlaceholder,
  objectElement,
  array,
  lastName,
  name,
  jobTitle,
  jobArea,
  jobDescriptor,
  jobType,
  ip,
  port,
  word,
  ipv6,
  color,
  username,
  macAddress,
  domainSuffix,
  domainName,
  email,
  domainUrl,
  zipCode,
  streetPrefix,
  streetSuffix,
  streetName,
  streetAddress,
  timeZone,
  latidude,
  longitude,
  latLong,
  direction,
  state,
  country,
  price,
  creditCardNumber,
  creditCardCVV,
  semver,
  month,
  weekday,
  date,
  bitcoinAddress,
  mimeType,
  fileExt,
  dirPath,
  filePath,
  fileName,
  setSeed,
  hex,
  password,
  nanoId,
  uuid,
  nonsecure
}
