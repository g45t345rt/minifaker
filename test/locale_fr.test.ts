import 'jest'
import minifaker from '../src'
import '../src/locales/fr'
import '../src/locales/fr_CA'

test('Test locale fr/fr_CA', () => {
  //minifaker.setDefaultLocale('fr') -> already set by import the first locale

  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: 'female' }))
  expect(minifaker.firstName({ gender: 'male' }))
  expect(() => minifaker.firstName({ locale: 'alien' })).toThrow()
  expect(() => minifaker.phoneNumber({ locale: 'alien' })).toThrow()
  expect(() => minifaker.firstName({ locale: 'fr_CA' })).toThrow() // should throw not implemented
  expect(minifaker.phoneNumber({ locale: 'fr_CA' }))
  expect(() => minifaker.setDefaultLocale('alien')).toThrow()
})
