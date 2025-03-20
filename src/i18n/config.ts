import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                welcome: 'Welcome',
            },
        },
        vi: {
            translation: {
                welcome: 'Chào mừng',
            },
        },
    },
});

export default i18n;
