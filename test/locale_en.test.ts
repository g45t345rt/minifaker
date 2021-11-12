import 'jest'
import minifaker from '../src'
import '../src/locale/en'

test('Test locale en', () => {
  expect(minifaker.phoneNumber())
  expect(minifaker.firstName())
  expect(minifaker.firstName({ gender: 'female' }))
  expect(minifaker.firstName({ gender: 'male' }))
})
