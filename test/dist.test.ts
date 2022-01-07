import minifaker from '../dist/index'
import '../dist/locales/en'

test('Test dist file', () => {
  expect(minifaker.boolean())
  expect(minifaker.username())
  expect(minifaker.uuid.v4())
  expect(minifaker.nanoId.nanoid())
  expect(minifaker.password.generate())
  expect(minifaker.nonsecure.nanoid())
})
