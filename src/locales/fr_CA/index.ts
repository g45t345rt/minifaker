import miniflare from '../../index'

import phoneFormats from './phone/formats'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'
import states from './address/states'
import stateAbbrs from './address/stateAbbrs'

const locale = {
  phoneFormats,
  domainSuffixes,
  freeEmails,
  postCodeFormats,
  stateAbbrs,
  states
}

miniflare.addLocale('fr_CA', locale)

export default locale