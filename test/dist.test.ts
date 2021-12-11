import minifaker from '../dist/index'
import '../dist/locales/en'

test('Test dist file', () => {
  expect(minifaker.boolean())
  expect(minifaker.username())
})
