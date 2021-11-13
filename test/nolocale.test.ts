import 'jest'
import minifaker from '../src'

test('Test function without locale', () => {
  expect(minifaker.number()).toBeLessThanOrEqual(1)
  expect(minifaker.number({ float: true }))
  expect(minifaker.boolean())
  expect(minifaker.arrayElement(['one', 'two', 'three']))
})
