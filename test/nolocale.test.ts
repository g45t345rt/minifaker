import 'jest'
import minifaker, { PlaceImgCategory, PlaceImgFilter } from '../src'

test('Test function without locale', () => {
  expect(minifaker.number()).toBeLessThanOrEqual(1)
  expect(minifaker.number({ float: true }))
  expect(minifaker.boolean())
  expect(minifaker.arrayElement(['one', 'two', 'three']))
  expect(minifaker.imageUrlFromPlaceIMG({ width: 500, height: 500 }))
  expect(minifaker.imageUrlFromPlaceIMG({ width: 500, height: 500, category: PlaceImgCategory.ANIMALS, filter: PlaceImgFilter.SEPIA }))
  expect(minifaker.imageUrlFromPlaceholder({ width: 250 }))
  expect(minifaker.imageUrlFromPlaceholder({ width: 250, height: 200, backColor: 'black', textColor: 'white', textValue: 'minifaker' }))
})
