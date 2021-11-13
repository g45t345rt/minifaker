import miniflare from '../../index'

import phoneFormats from './phone/formats'

const locale = {
  phoneFormats
}

miniflare.addLocale('fr_CA', locale)

export default locale