import minifaker from '../../index'

import firstNames from './name/firstNames'
import maleFirstNames from './name/maleFirstNames'
import femaleFirstNames from './name/femaleFirstNames'
import phoneFormats from './phone/formats'
import cityNames from './address/cityNames'
import cityPrefixes from './address/cityPrefixes'
import citySuffixes from './address/citySuffixes'
import lastNames from './name/lastNames'
import titles from './name/titles'
import adjectives from './word/adjectives'
import adverbs from './word/adverbs'
import conjunctions from './word/conjunctions'
import interjections from './word/interjections'
import nouns from './word/nouns'
import prepositions from './word/prepositions'
import verbs from './word/verbs'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'
import streetSuffixes from './address/streetSuffixes'
import timeZones from './address/timeZones'
import directions from './address/directions'
import states from './address/states'
import stateAbbrs from './address/stateAbbrs'
import countries from './address/countries'
import countryCodesAlpha2 from './address/countryCodesAlpha2'
import countryCodesAlpha3 from './address/countryCodesAlpha3'

const locale = {
  maleFirstNames,
  femaleFirstNames,
  firstNames,
  phoneFormats,
  cityNames,
  cityPrefixes,
  citySuffixes,
  lastNames,
  ...titles,
  adjectives,
  adverbs,
  conjunctions,
  interjections,
  nouns,
  prepositions,
  verbs,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  streetSuffixes,
  timeZones,
  directions,
  states,
  stateAbbrs,
  countries,
  countryCodesAlpha2,
  countryCodesAlpha3
}

minifaker.addLocale('en', locale)

export default locale
