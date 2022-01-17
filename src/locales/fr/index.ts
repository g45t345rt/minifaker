import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'
import provinces from './address/provinces'
import cityNames from './address/cityNames'
import lastNames from './name/lastNames'
import titles from './name/titles'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'
import streetPrefixes from './address/streetPrefixes'
import streetSuffixes from './address/streetSuffixes'
import directions from './address/directions'
import countries from './address/countries'
import months from './date/months'
import weekdays from './date/weekdays'
import nouns from './word/nouns'
import timeZones from '../en/address/timeZones' // TODO it's in english for now

const defaultCurrency = 'EUR'
const defaultCountry = 'France'
const title = 'French (France)'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  provinces,
  cityNames,
  lastNames,
  ...titles,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  streetPrefixes,
  streetSuffixes,
  directions,
  countries,
  defaultCurrency,
  months,
  weekdays,
  defaultCountry,
  nouns,
  timeZones
}

minifaker.addLocale('fr', locale)

export default locale
