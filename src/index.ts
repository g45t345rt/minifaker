// Packages
import _seedrandom from 'seedrandom' // seedrandom().quick() is 1.8x faster than native Math.random() + I can set a seed :)
import * as _nanoid from 'nanoid'
import * as _uuid from 'uuid'
import _generatePassword from 'generate-password'

// Helpers and data
import creditCardProviders, { CreditCardProvider } from './data/creditCardProviders'
import checkLuhn from './helpers/checkLuhn'
import { replaceRangeSymbols, replaceSymbols } from './helpers/replaceStrings'
import dirPaths from './data/dirPaths'
import commonMimeTypes from './data/commonMimeTypes'

const locales = {}
let defaultLocale = null
let random = _seedrandom()

const throwNoDefaultLocale = () => {
  throw new Error(`No default locale defined. Import at least one locale!`)
}

const throwNoLocale = (locale: string) => {
  throw new Error(`The locale [${locale}] is not imported or supported.`)
}

const throwNoLocaleData = (locale: string, key: string) => {
  throw new Error(`The locale [${locale}] data of [${key}] doest not exists. Mostly not implemented yet!.`)
}

const setSeed = (seed: string) => {
  random = _seedrandom(seed)
}

const getLocaleData = <T>({ locale: _locale, key }: { locale?: string, key: string }): T => {
  if (!defaultLocale) throwNoDefaultLocale()

  const locale = _locale || defaultLocale
  if (!locales[locale]) throwNoLocale(locale)

  const localeData = locales[locale]
  if (!localeData[key]) throwNoLocaleData(locale, key)
  return localeData[key]
}

export const nanoId = _nanoid
export const uuid = _uuid
export const password = _generatePassword

export const addLocale = (name: string, locale) => {
  const noLocales = Object.keys(locales).length === 0
  locales[name] = locale
  if (noLocales) setDefaultLocale(name)
}

export const setDefaultLocale = (locale: string) => {
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

export const array = <T>(count: number, cb: (index: number) => void): T[] => {
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

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export const firstName = (options: { locale?: string, gender?: Gender } = {}): string => {
  const { locale, gender } = options
  switch (gender) {
    case Gender.FEMALE:
      const femaleFirstNames = getLocaleData<string[]>({ locale, key: 'femaleFirstNames' })
      return arrayElement(femaleFirstNames)
    case Gender.MALE:
      const maleFirstNames = getLocaleData<string[]>({ locale, key: 'maleFirstNames' })
      return arrayElement(maleFirstNames)
    default:
      const firstNames = getLocaleData<string[]>({ locale, key: 'firstNames' })
      return arrayElement(firstNames)
  }
}

export const phoneNumber = (options: { locale?: string, formats?: string[] } = {}) => {
  const { locale, formats } = options
  const phoneFormats = formats || getLocaleData<string[]>({ locale, key: 'phoneFormats' })
  return arrayElement(phoneFormats).split('').map((c) => {
    if (c === '#') return number({ max: 9 })
    return c
  }).join('')
}

export const cityName = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const cityNames = getLocaleData<string[]>({ locale, key: 'cityNames' })
  return arrayElement(cityNames)
}

export const cityPrefix = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const cityPrefixes = getLocaleData<string[]>({ locale, key: 'cityPrefixes' })
  return arrayElement<string>(cityPrefixes)
}

export const citySuffix = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const citySuffixes = getLocaleData<string[]>({ locale, key: 'citySuffixes' })
  return arrayElement<string>(citySuffixes)
}

export enum PlaceImgCategory {
  ANY = 'any',
  ANIMALS = 'animals',
  ARCHITECTURE = 'architecture',
  NATURE = 'nature',
  PEOPLE = 'people',
  TECH = 'tech'
}

export enum PlaceImgFilter {
  GRAYSCALE = 'grayscale',
  SEPIA = 'sepia'
}

export const imageUrlFromPlaceIMG = (options: { width: number, height: number, category?: PlaceImgCategory, filter?: PlaceImgFilter }) => {
  const { width, height, category, filter } = { category: PlaceImgCategory.ANY, ...options }
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

export const lastName = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const lastNames = getLocaleData<string[]>({ locale, key: 'lastNames' })
  return arrayElement(lastNames)
}

export const name = (options?: { locale?: string, gender?: Gender }): string => {
  return `${firstName(options)} ${lastName(options)}`
}

export const jobTitle = (options?: { locale?: string }): string => {
  return `${jobDescriptor(options)} ${jobArea(options)} ${jobType(options)}`
}

export const jobType = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const jobTypes = getLocaleData<string[]>({ locale, key: 'jobTypes' })
  return arrayElement(jobTypes)
}

export const jobArea = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const jobLevels = getLocaleData<string[]>({ locale, key: 'jobLevels' })
  return arrayElement(jobLevels)
}

export const jobDescriptor = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const jobDescriptors = getLocaleData<string[]>({ locale, key: 'jobDescriptors' })
  return arrayElement(jobDescriptors)
}

export const ip = (): string => {
  return array(4, () => number({ max: 255 })).join('.')
}

export const port = (): number => {
  return number({ max: 65535 })
}

export const ipv6 = (): string => {
  return array(8, () => number({ max: 65535 }).toString(16)).join(':')
}

const hexPadLeft = (value: string) => {
  if (value.length === 1) return `0${value}`
  return value
}

export const color = (options: { r?: number, g?: number, b?: number } = {}): string => {
  const { r, g, b } = options

  const red = (r || number({ max: 256 })).toString(16)
  const green = (g || number({ max: 256 })).toString(16)
  const blue = (b || number({ max: 256 })).toString(16)
  return `#${hexPadLeft(red)}${hexPadLeft(green)}${hexPadLeft(blue)}`
}

export enum WordType {
  VERB = 'verb',
  PREPOSITION = 'preposition',
  NOUN = 'noun',
  INTERJECTION = 'interjection',
  CONJUNCTION = 'conjunction',
  ADVERB = 'adverb',
  ADJECTIVE = 'adjective'
}

export const word = (options: { locale?: string, type?: WordType, filter?: (word: string) => void } = {}): string => {
  const { type, locale, filter } = options
  const _type = type || arrayElement(Object.values(WordType))
  const adjectives = getLocaleData<string[]>({ locale, key: `${_type}s` })
  if (typeof filter === 'function') return arrayElement(adjectives.filter(filter))
  return arrayElement(adjectives)
}

export const username = (options: { locale?: string, type?: number, firstName?: string, lastName?: string } = {}): string => {
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

export enum MacAddressSeparator { NONE = '', DOT = '.', COLON = ':', DASH = '-', SPACE = ' ' }

export enum MacAddressTransmission {
  UNICAST = 'unicast',
  MULTICAST = 'multicast'
}

export enum MacAddressAdministration {
  LAA = 'laa', // locally administered
  UAA = 'uaa' // globally unique (oui enforced)
}

// TODO: EUI64 address -- https://kwallaceccie.mykajabi.com/blog/how-to-calculate-an-eui-64-address
export const macAddress = (options: {
  separator?: MacAddressSeparator,
  transmission?: MacAddressTransmission,
  administration?: MacAddressAdministration
} = {}): string => {
  const { separator = MacAddressSeparator.COLON, transmission, administration } = options

  const mac = array(6, (index) => {
    let value = number({ max: 255 })

    // https://en.wikipedia.org/wiki/MAC_address#Address_details
    // use first octet to set transmission and administration bits
    if (index === 0) {
      if (transmission === MacAddressTransmission.MULTICAST)
        value |= 1 << 0 // set bit https://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascript
      else if (transmission === MacAddressTransmission.UNICAST)
        value &= ~(1 << 0) // unset bit

      if (administration === MacAddressAdministration.LAA)
        value |= 1 << 1
      else if (administration === MacAddressAdministration.UAA)
        value &= ~(1 << 1)
    }

    return hexPadLeft(value.toString(16))
  })

  if (separator === MacAddressSeparator.DOT) {
    let dotMac = ''
    for (let i = 0; i < mac.length; i++) {
      dotMac += mac[i]
      if (i % 2 == 1 && i < mac.length - 1) dotMac += separator
    }
    return dotMac
  }

  return mac.join(separator)
}

export const email = (options: { locale?: string, firstName?: string, lastName?: string, provider?: string } = {}): string => {
  const { locale, provider: _provider } = options
  const freeEmails = getLocaleData<string[]>({ locale, key: 'freeEmails' })
  const provider = _provider || arrayElement(freeEmails)
  return `${username(options)}@${provider}`
}

export const domainName = (options: { locale?: string } = {}): string => {
  const { locale } = options

  const name = arrayElement([
    word({ locale, type: WordType.NOUN }),
    firstName({ locale })
  ])

  return `${name.toLowerCase()}.${domainSuffix({ locale })}`
}

export const domainSuffix = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const domainSuffixes = getLocaleData<string[]>({ locale, key: 'domainSuffixes' })
  return arrayElement(domainSuffixes)
}

export const domainUrl = (options: { locale?: string } = {}): string => `https://${domainName(options)}`

export const zipCode = (options: { locale?: string, format?: string } = {}): string => {
  const { locale, format: _format } = options

  let format = _format
  if (!format) {
    const formats = getLocaleData<string[]>({ locale, key: 'postCodeFormats' })
    format = arrayElement(formats)
  }

  return replaceSymbols(format)
}

export const streetSuffix = (options: { locale?: string } = {}) => {
  const { locale } = options
  const streetSuffixes = getLocaleData<string[]>({ locale, key: 'streetSuffixes' })
  return arrayElement(streetSuffixes)
}

export const streetPrefix = (options: { locale?: string } = {}) => {
  const { locale } = options
  const streetSuffixes = getLocaleData<string[]>({ locale, key: 'streetPrefixes' })
  return arrayElement(streetSuffixes)
}

export const streetName = (options: { locale?: string } = {}) => {
  return `${arrayElement([firstName(options), lastName(options)])} ${streetSuffix(options)}`
}

export const streetAddress = (options: { locale?: string } = {}) => {
  const streetNumber = array(number({ min: 3, max: 5 }), () => number({ max: 9 })).join('')
  return `${streetNumber} ${streetName(options)}`
}

export const timeZone = (options: { locale?: string } = {}) => {
  const { locale } = options
  const timeZones = getLocaleData<string[]>({ locale, key: 'timeZones' })
  return arrayElement(timeZones)
}

export const latidude = (): string => {
  return number({ min: -90, max: 90, float: true }).toFixed(6)
}

export const longitude = (): string => {
  return number({ min: -180, max: 180, float: true }).toFixed(6)
}

export const latLong = (): string => {
  return `${latidude()}, ${longitude()}`
}

export enum DirectionType {
  CARDINAL = 'cardinal',
  ORDINAL = 'ordinal'
}

export const direction = (options: { locale?: string, type?: DirectionType, useAbbr?: boolean } = {}): string => {
  const { locale, type, useAbbr } = options

  const directions = getLocaleData<{ cardinal: string[][], ordinal: string[][] }>({ locale, key: 'directions' })
  const allDirections = [...directions.cardinal, ...directions.ordinal]
  const mapValue = (value) => useAbbr ? value[1] : value[0]

  if (type) return arrayElement(directions[type].map(mapValue))
  return arrayElement(allDirections.map(mapValue))
}

export const state = (options: { locale?: string, useAbbr?: boolean } = {}): string => {
  const { locale, useAbbr } = options

  const states = useAbbr ? getLocaleData<string[]>({ locale, key: 'stateAbbrs' }) : getLocaleData<string[]>({ locale, key: 'states' })
  return arrayElement(states)
}

export enum CountryCodeType {
  Alpha2 = 'alpha2',
  Alpha3 = 'alpha3'
}

export const country = (options: { locale?: string, useCode?: CountryCodeType } = {}): string => {
  const { locale, useCode } = options

  const getLocaleDataKey = () => {
    switch (useCode) {
      case CountryCodeType.Alpha2:
        return 'countryCodesAlpha2'
      case CountryCodeType.Alpha3:
        return 'countryCodesAlpha3'
      default:
        return 'countries'
    }
  }

  const countries = getLocaleData<string[]>({ locale, key: getLocaleDataKey() })
  return arrayElement(countries)
}

export const price = (options: { locale?: string, min?: number, max?: number, currency?: string } = {}): string => {
  const { locale: _locale, min, max, currency: _currency } = { min: 0, max: 1000, ...options }
  // don't use getLocaleData since Intl.NumberFormat already support all locales
  const locale = _locale || defaultLocale
  const currency = _currency || (locales[locale] && locales[locale]['defaultCurrency'])
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency })
  return formatter.format(number({ min, max, float: true }))
}

export { CreditCardProvider }

export const creditCardNumber = (options: { provider?: CreditCardProvider } = {}): string => {
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

export const creditCardCVV = (): string => {
  return array(3, () => number({ max: 9 })).join('')
}

export const semver = () => {
  return [number({ max: 9 }), number({ max: 20 }), number({ max: 99 })].join('.')
}

export const month = (options: { locale?: string, useAbbr?: boolean } = {}) => {
  const { locale, useAbbr } = options
  const months = getLocaleData<{ wide: string[], abbr: string[] }>({ locale, key: 'months' })
  const { wide, abbr } = months
  return arrayElement(useAbbr ? abbr : wide)
}

export const weekday = (options: { locale?: string, useAbbr?: boolean } = {}) => {
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

export const bitcoinAddress = (): string => {
  const prefix = arrayElement(['1', '3', 'bc1'])
  const count = number({ min: 27, max: 34 })
  const characters = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ' // without 0, O, I, and l.
  return `${prefix}${array(count, () => arrayElement(characters.split(''))).join('')}`
}

// Using commonMimeTypes because it's smaller and we don't need all of them to generate fake data - The full is still in the package but not exported => ./data/mimeType
export const mimeType = (): string => {
  return arrayElement(Object.values(commonMimeTypes))
}

export const fileExt = () => {
  return arrayElement(Object.keys(commonMimeTypes))
}

export const dirPath = (): string => {
  return arrayElement(dirPaths)
}

export const fileName = (): string => {
  const words = array(number({ max: 3 }), () => word())
  return `${words.join('_').toLocaleLowerCase()}${fileExt()}`
}

export const filePath = (): string => {
  return `${dirPath()}/${fileName()}`
}

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
  nanoId,
  uuid,
  password
}
