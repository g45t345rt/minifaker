import minifaker from '../src'

test('setSeed', () => {
  minifaker.setSeed("1")
  const ip1 = minifaker.ip()
  expect(ip1).toBe("69.40.53.68")
  minifaker.setSeed("2")
  const ip2 = minifaker.ip()
  expect(ip2).toBe("182.11.30.237")
  minifaker.setSeed("1")
  const ip1_1 = minifaker.ip()
  expect(ip1_1).toBe("69.40.53.68")
})
