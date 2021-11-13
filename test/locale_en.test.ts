import 'jest'
import minifaker, { Gender } from '../src'
import '../src/locales/en'

test('Test locale en', () => {
  expect(minifaker.phoneNumber())
  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: Gender.FEMALE }))
  expect(minifaker.firstName({ gender: Gender.MALE }))
  expect(minifaker.cityName())
  expect(minifaker.cityPrefix())
  expect(minifaker.citySufix())
  expect(() => minifaker.city()).toThrow()
  expect(minifaker.lastName())
  expect(minifaker.name())
})
