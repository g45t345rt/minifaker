import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats
}

minifaker.addLocale('fr', locale)

export default locale
