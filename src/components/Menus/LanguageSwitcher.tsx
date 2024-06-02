import React, {useMemo} from 'react';
import {MenuItem, Select, SelectChangeEvent, SxProps, Theme, useTheme} from '@mui/material';
import useLanguage from '../../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
    const {currentLanguage, changeLanguage} = useLanguage();
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<string>) => {
        changeLanguage(event.target.value);
    };

    const selectStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }), [theme]);

    return (
        <Select
            value={currentLanguage}
            onChange={handleChange}
            sx={selectStyles}
        >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
        </Select>
    );
};

export default React.memo(LanguageSwitcher);
