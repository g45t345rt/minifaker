import minifaker from '../dist/cjs/index'
import '../dist/cjs/locales/en'

test('Test dist file', () => {
  expect(minifaker.boolean())
  expect(minifaker.username())
  expect(minifaker.uuid.v4())
  expect(minifaker.nanoId.nanoid())
  expect(minifaker.password.generate())
  expect(minifaker.nonsecure.nanoid())
})
