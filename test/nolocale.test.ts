import 'jest'
import minifaker from '../src'

test('Test function without locale', () => {
  expect(minifaker.randomNumber()).toBeLessThanOrEqual(1)
  expect(minifaker.randomNumber({ float: true }))
  expect(minifaker.arrayElement(['one', 'two', 'three']))
})
