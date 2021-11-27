import 'jest'
import 'jest-extended'
import checkLuhn from '../src/helpers/checkLuhn'
import { replaceSymbols, replaceRangeSymbols, alphabet } from '../src/helpers/replaceStrings'

const oneToNine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const oneToNineString = oneToNine.map(v => v.toString())

test('Test replace strings ', () => {
  // # replace 0-9
  // ? replace A-Z
  // * replace 0-9 or A-Z
  expect(replaceSymbols('#')).toBeOneOf(oneToNineString)
  expect(replaceSymbols('?')).toBeOneOf(alphabet)
  expect(replaceSymbols('*')).toBeOneOf([...oneToNineString, ...alphabet])

  expect(replaceRangeSymbols('[0-9]')).toBeOneOf(oneToNineString)
  expect(replaceRangeSymbols('#{3,4}'))
  expect(replaceRangeSymbols('#{9}'))
  expect(replaceRangeSymbols('5018-#{2,4}-#{4}-[5-6]'))

  expect(checkLuhn([7, 9, 9, 2, 7, 3, 9, 8, 7, 1])).toEqual(3)
  expect(checkLuhn([6, 7, 6, 7, 8, 7, 6, 5, 0, 2, 2, 4, 1, 8, 9, 7, 8])).toEqual(5)
})
