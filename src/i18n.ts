// src/i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translations
import enTranslation from './localization/locales/en/translation.json';
import frTranslation from './localization/locales/fr/translation.json';

i18n
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            fr: {
                translation: frTranslation,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    }).then(() => console.log('i18n initialized'));
