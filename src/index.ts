const locales = {}
let defaultLocale = null

const throwNoLocale = (locale: string) => {
  throw new Error(`The locale [${locale}] is not imported or supported.`)
}

const throwNotLocaleData = (locale: string, key: string) => {
  throw new Error(`The locale [${locale}] data of [${key}] doest not exists. Mostly not implemented yet!.`)
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

export const randomNumber = (options: { min?: number, max?: number, float?: boolean } = {}): number => {
  const { min, max, float } = { min: 0, max: 1, float: false, ...options }
  const value = min + Math.random() * (max - min)
  if (!float) return Math.round(value)
  return value
}

export const arrayElement = <T>(array: T[]): T => {
  return array[randomNumber({ max: array.length - 1 })]
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
    if (c === '#') return randomNumber({ max: 9 })
    return c
  }).join('')
}

export default {
  setDefaultLocale,
  addLocale,
  randomNumber,
  phoneNumber,
  firstName,
  arrayElement
}