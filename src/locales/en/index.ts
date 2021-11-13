import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'
import cityNames from './address/cityNames'
import cityPrefixes from './address/cityPrefixes'
import citySufixes from './address/citySufixes'
import lastNames from './name/lastNames'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  cityNames,
  cityPrefixes,
  citySufixes,
  lastNames
}

minifaker.addLocale('en', locale)

export default locale
