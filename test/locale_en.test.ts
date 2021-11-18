import 'jest'
import minifaker, { Gender, WordType } from '../src'
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
  expect(minifaker.jobTitle())
  expect(minifaker.jobArea())
  expect(minifaker.jobDescriptor())
  expect(minifaker.jobType())
  expect(minifaker.word())
  expect(minifaker.word({ filter: (word) => word.length > 5 }))
  expect(minifaker.word({ type: WordType.NOUN }))
  expect(minifaker.username())
  expect(minifaker.username({ type: 0 }))
  expect(minifaker.username({ type: 1 }))
  expect(minifaker.username({ type: 2 }))
})
