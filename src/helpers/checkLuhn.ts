// https://en.wikipedia.org/wiki/Luhn_algorithm
export default (numbers: number[]): number => {
  numbers.reverse()

  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    let digit = numbers[i]
    if (i % 2 === 0) digit *= 2
    if (digit > 9) sum -= 9 // 18-9=9, 17-9=8, 16-9=7 ....

    sum += digit
  }

  return 10 - sum % 10
}
