import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import vi from "./locales/vi.json"

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
}

i18n.use(initReactI18next).init({
  lng: "vi",
  fallbackLng: "vi",
  resources,
})

export default i18n
