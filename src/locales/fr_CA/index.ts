import miniflare from '../../index'

import phoneFormats from './phone/formats'
import domainSuffixes from './internet/domainSuffixes'
import freeEmails from './internet/freeEmails'
import postCodeFormats from './address/postCodeFormats'

const locale = {
  phoneFormats,
  domainSuffixes,
  freeEmails,
  postCodeFormats
}

miniflare.addLocale('fr_CA', locale)

export default locale