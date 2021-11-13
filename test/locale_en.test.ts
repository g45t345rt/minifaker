import 'jest'
import minifaker from '../src'
import '../src/locales/en'

test('Test locale en', () => {
  expect(minifaker.phoneNumber())
  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: 'female' }))
  expect(minifaker.firstName({ gender: 'male' }))
  expect(minifaker.cityName())
  expect(minifaker.cityPrefix())
  expect(minifaker.citySufix())
  expect(() => minifaker.city()).toThrow()
})
