// src/components/LanguageSwitcher.tsx
import React from 'react';
import {MenuItem, Select, SelectChangeEvent, useTheme} from '@mui/material';
import useLanguage from '../../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
    const {currentLanguage, changeLanguage} = useLanguage();
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent) => {
        changeLanguage(event.target.value as string);
    };

    return (
        <Select
            value={currentLanguage}
            onChange={handleChange}
            sx={{
                color: theme.palette.getContrastText(theme.palette.primary.main),
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            }}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
        </Select>
    );
};

export default LanguageSwitcher;
