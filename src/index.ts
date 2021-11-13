const locales = {}
let defaultLocale = null

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

export const firstName = (options: { locale?: string, gender?: string } = {}): string => {
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
  imageUrlFromPlaceholder
}