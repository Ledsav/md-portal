// src/hooks/useLanguage.ts
import { useTranslation } from 'react-i18next';

const useLanguage = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language); // Save selected language to localStorage
    };

    const currentLanguage = i18n.language || 'en'; // Default to English if no language is set

    return {
        currentLanguage,
        changeLanguage,
    };
};

export default useLanguage;
