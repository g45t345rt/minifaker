import minifaker from "../../index"

import enLocale from "../en"

import phoneFormats from "./phone/formats"

const defaultCurrency = "USD"
const defaultCountry = "United States"
const title = "English (United States)"

const locale = {
  ...enLocale,
  phoneFormats,
};

minifaker.addLocale("en-US", locale)

export default locale
