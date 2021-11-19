import miniflare from '../../index'

import phoneFormats from './phone/formats'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'

const locale = {
  phoneFormats,
  domainSuffixes,
  freeEmails
}

miniflare.addLocale('fr_CA', locale)

export default locale