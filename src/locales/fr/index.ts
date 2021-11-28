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
import postCodeFormats from './address/postCodeFormats'
import streetPrefixes from './address/streetPrefixes'
import streetSuffixes from './address/streetSuffixes'
import directions from './address/directions'
import states from './address/states'
import countries from './address/countries'
import months from './date/months'
import weekdays from './date/weekdays'

const defaultCurrency = 'EUR'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  cityNames,
  lastNames,
  ...titles,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  streetPrefixes,
  streetSuffixes,
  directions,
  states,
  countries,
  defaultCurrency,
  months,
  weekdays
}

minifaker.addLocale('fr', locale)

export default locale
