const locales = {}
let defaultLocale = null

const throwNoDefaultLocale = () => {
  throw new Error(`No default locale defined. Import at least one locale!`)
}

const throwNoLocale = (locale: string) => {
  throw new Error(`The locale [${locale}] is not imported or supported.`)
}

const throwNotLocaleData = (locale: string, key: string) => {
  throw new Error(`The locale [${locale}] data of [${key}] doest not exists. Mostly not implemented yet!.`)
}

const throwNotImplemented = () => {
  throw new Error(`Not implemented yet.`)
}

const getLocaleData = <T>({ locale: _locale, key }: { locale?: string, key: string }): T => {
  if (!defaultLocale) throwNoDefaultLocale()

  const locale = _locale || defaultLocale
  if (!locales[locale]) throwNoLocale(locale)

  const localeData = locales[locale]
  if (!localeData[key]) throwNotLocaleData(locale, key)
  return localeData[key]
}

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
  const value = min + Math.random() * (max - min)
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

export const city = (options: { locale?: string } = {}): string => {
  return throwNotImplemented()
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

export const citySufix = (options: { locale?: string } = {}): string => {
  const { locale } = options
  const citySufixes = getLocaleData<string[]>({ locale, key: 'citySufixes' })
  return arrayElement<string>(citySufixes)
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

export const color = (options: { r?: number, g?: number, b?: number } = {}): string => {
  const { r, g, b } = options
  const leadingZero = (value: string) => {
    if (value.length === 1) return `0${value}`
    return value
  }

  const red = (r || number({ max: 256 })).toString(16)
  const green = (g || number({ max: 256 })).toString(16)
  const blue = (b || number({ max: 256 })).toString(16)
  return `#${leadingZero(red)}${leadingZero(green)}${leadingZero(blue)}`
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

export default {
  setDefaultLocale,
  addLocale,
  cityName,
  citySufix,
  cityPrefix,
  number,
  phoneNumber,
  firstName,
  arrayElement,
  boolean,
  city,
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
  color
}