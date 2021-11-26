import 'jest'
import minifaker, { Gender } from '../src'
import '../src/locales/fr'
import '../src/locales/fr-CA'

test('Test locale fr/fr-CA', () => {
  //minifaker.setDefaultLocale('fr') -> already set by importing the first locale

  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: Gender.FEMALE }))
  expect(minifaker.firstName({ gender: Gender.MALE }))
  expect(() => minifaker.firstName({ locale: 'alien' })).toThrow()
  expect(() => minifaker.phoneNumber({ locale: 'alien' })).toThrow()
  expect(() => minifaker.firstName({ locale: 'fr-CA' })).toThrow() // should throw not implemented
  expect(minifaker.phoneNumber({ locale: 'fr-CA' }))
  expect(() => minifaker.setDefaultLocale('alien')).toThrow()
  expect(minifaker.lastName())
  expect(minifaker.name())
  expect(minifaker.jobType())
  expect(minifaker.zipCode({ locale: 'fr-CA' }))
  expect(minifaker.streetPrefix())
  expect(minifaker.streetAddress())
  expect(minifaker.direction())
  expect(minifaker.state())
  expect(minifaker.state({ locale: 'fr-CA' }))
  expect(minifaker.country())
  expect(minifaker.price())
  expect(minifaker.price({ locale: 'fr-CA' }))
  expect(minifaker.price({ locale: 'en-CA', currency: 'CAD' }))
})
