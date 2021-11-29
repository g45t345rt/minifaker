import 'jest'

import minifaker, { CountryCodeType, DirectionType, Gender, WordType } from '../src'
import '../src/locales/en'
import '../src/locales/fr'
import '../src/locales/fr-CA'
import '../src/locales/es'

const locales = ['en', 'fr', 'fr-CA', 'es']

test('Test locales all', () => {
  expect(() => minifaker.cityPrefix({ locale: 'fr' })).toThrow() // fr does not have city prefix - test throwNoLocaleData()

  locales.forEach((locale) => {
    minifaker.setDefaultLocale(locale)

    expect(minifaker.phoneNumber())
    expect(minifaker.firstName())
    expect(minifaker.firstName({ gender: Gender.FEMALE }))
    expect(minifaker.firstName({ gender: Gender.MALE }))
    expect(minifaker.cityName())

    if (locale === 'en') {
      expect(minifaker.cityPrefix())
      expect(minifaker.citySuffix())
      expect(minifaker.word())
      expect(minifaker.word({ filter: (word) => word.length > 5 }))
      expect(minifaker.word({ type: WordType.NOUN }))
      expect(minifaker.state({ useAbbr: true }))
      expect(minifaker.country({ useCode: CountryCodeType.Alpha2 }))
      expect(minifaker.country({ useCode: CountryCodeType.Alpha3 }))
    }

    if (locale === 'fr' || locale === 'es') {
      expect(minifaker.streetPrefix())
    }

    expect(minifaker.lastName())
    expect(minifaker.name())
    expect(minifaker.jobTitle())
    expect(minifaker.jobArea())
    expect(minifaker.jobDescriptor())
    expect(minifaker.jobType())
    expect(minifaker.username())
    expect(minifaker.username({ type: 0 }))
    expect(minifaker.username({ type: 1 }))
    expect(minifaker.username({ type: 2 }))
    expect(minifaker.domainSuffix())
    expect(minifaker.domainName())
    expect(minifaker.email())
    expect(minifaker.email({ firstName: 'alice' }))
    expect(minifaker.email({ firstName: 'james', lastName: 'bond' }))
    expect(minifaker.email({ provider: 'pm.me' }))
    expect(minifaker.domainUrl())
    expect(minifaker.zipCode())
    expect(minifaker.streetSuffix())
    expect(minifaker.streetName())
    expect(minifaker.streetAddress())
    expect(minifaker.timeZone())
    expect(minifaker.direction())
    expect(minifaker.direction({ useAbbr: true }))
    expect(minifaker.direction({ type: DirectionType.CARDINAL }))
    expect(minifaker.state())
    expect(minifaker.country())
    expect(minifaker.price())
    expect(minifaker.price({ min: 500, max: 50000 }))
    expect(minifaker.month())
    expect(minifaker.weekday())
    expect(minifaker.month({ useAbbr: true }))
    expect(minifaker.weekday({ useAbbr: true }))
  })
})
