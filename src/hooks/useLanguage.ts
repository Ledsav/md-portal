import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';

const useLanguage = () => {
    const {i18n} = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language || 'en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage && storedLanguage !== i18n.language) {
            i18n.changeLanguage(storedLanguage).then(() => {
                setCurrentLanguage(storedLanguage);
            });
        } else {
            setCurrentLanguage(i18n.language);
        }
    }, [i18n]);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language).then(() => {
            setCurrentLanguage(language);
            localStorage.setItem('language', language);
        });
    };

    return {
        currentLanguage,
        changeLanguage,
    };
};

export default useLanguage;
