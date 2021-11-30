import { number, boolean, arrayElement, array } from '../index'

export const replaceSymbols = (value: string): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return value.split('').map((c) => {
    if (c === '#') return number({ max: 9 }).toString()
    if (c === '?') return arrayElement(alphabet)
    if (c === '*') {
      if (boolean()) return arrayElement(alphabet)
      else return number({ max: 9 }).toString()
    }
    return c
  }).join('')
}

// You need `g` flag with `matchAll()`
const rangeRepRegex = new RegExp(/(.)\{(\d+)\,(\d+)\}/, 'g') // #{5,6}
const repRegex = new RegExp(/(.)\{(\d+)\}/, 'g')  // #{4}
const rangeRegex = new RegExp(/\[(\d+)\-(\d+)\]/, 'g') // [4-6]  

const regexMatchAllArray = (value: string, regex: RegExp) => [...value.matchAll(regex)]

export const replaceRangeSymbols = (value: string): string => {
  let newValue = value.slice()

  // #{5,6}
  regexMatchAllArray(newValue, rangeRepRegex).forEach((values) => {
    const [match, symbol, min, max] = values
    const valueToReplace = array(number({ min: parseInt(min), max: parseInt(max) }), () => replaceSymbols(symbol)).join('')
    newValue = newValue.replace(match, valueToReplace)
  })

  // #{4}
  regexMatchAllArray(newValue, repRegex).forEach((values) => {
    const [match, symbol, count] = values
    const valueToReplace = array(parseInt(count), () => replaceSymbols(symbol)).join('')
    newValue = newValue.replace(match, valueToReplace)
  })

  // [4-6]
  regexMatchAllArray(newValue, rangeRegex).forEach((values) => {
    const [match, min, max] = values
    const valueToReplace = number({ min: parseInt(min), max: parseInt(max) }).toString()
    newValue = newValue.replace(match, valueToReplace)
  })

  return newValue
}
