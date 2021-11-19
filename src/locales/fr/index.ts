import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'
import cityNames from './address/cityNames'
import lastNames from './name/lastNames'
import titles from './name/titles'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  cityNames,
  lastNames,
  ...titles,
  domainSuffixes,
  freeEmails
}

minifaker.addLocale('fr', locale)

export default locale
