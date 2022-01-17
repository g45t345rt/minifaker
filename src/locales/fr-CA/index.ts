import miniflare from '../../index'

import frLocale from '../fr'

import phoneFormats from './phone/formats'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'
import provinces from './address/provinces'
import provinceAbbrs from './address/provinceAbbrs'

const defaultCurrency = 'CAD'
const defaultCountry = 'Canada'
const title = 'French (Canada)'

const locale = {
  ...frLocale,
  phoneFormats,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  provinceAbbrs,
  provinces,
  defaultCurrency,
  defaultCountry
}

miniflare.addLocale('fr-CA', locale)

export default locale