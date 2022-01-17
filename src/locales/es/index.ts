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
import provinces from './address/provinces'
import countries from './address/countries'
import months from './date/months'
import weekdays from './date/weekdays'
import timeZones from './address/timeZones'
import nouns from './word/nouns'
import states from './address/states'
import stateAbbrs from '../en/address/stateAbbrs'

const defaultCurrency = 'EUR'
const defaultCountry = 'España'
const title = 'Spanish'

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
  provinces,
  countries,
  defaultCurrency,
  months,
  weekdays,
  defaultCountry,
  timeZones,
  nouns,
  states,
  stateAbbrs
}

minifaker.addLocale('es', locale)

export default locale
