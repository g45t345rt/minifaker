import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'
import cityNames from './address/cityNames'
import cityPrefixes from './address/cityPrefixes'
import citySufixes from './address/citySufixes'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  cityNames,
  cityPrefixes,
  citySufixes
}

minifaker.addLocale('en', locale)

export default locale
