import miniflare from '../../index'

import frLocale from '../fr'

import phoneFormats from './phone/formats'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'
import states from './address/states'
import stateAbbrs from './address/stateAbbrs'

const defaultCurrency = 'CAD'
const defaultCountry = 'Canada'
const title = 'French (Canada)'

const locale = {
  ...frLocale,
  phoneFormats,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  stateAbbrs,
  states,
  defaultCurrency,
  defaultCountry
}

miniflare.addLocale('fr-CA', locale)

export default locale