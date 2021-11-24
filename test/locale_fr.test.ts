import 'jest'
import minifaker, { Gender } from '../src'
import '../src/locales/fr'
import '../src/locales/fr_CA'

test('Test locale fr/fr_CA', () => {
  //minifaker.setDefaultLocale('fr') -> already set by importing the first locale

  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: Gender.FEMALE }))
  expect(minifaker.firstName({ gender: Gender.MALE }))
  expect(() => minifaker.firstName({ locale: 'alien' })).toThrow()
  expect(() => minifaker.phoneNumber({ locale: 'alien' })).toThrow()
  expect(() => minifaker.firstName({ locale: 'fr_CA' })).toThrow() // should throw not implemented
  expect(minifaker.phoneNumber({ locale: 'fr_CA' }))
  expect(() => minifaker.setDefaultLocale('alien')).toThrow()
  expect(minifaker.lastName())
  expect(minifaker.name())
  expect(minifaker.jobType())
  expect(minifaker.zipCode({ locale: 'fr_CA' }))
  expect(minifaker.streetPrefix())
  expect(minifaker.streetAddress())
  expect(minifaker.direction())
})
