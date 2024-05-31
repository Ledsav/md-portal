import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../../../context/ThemeContext';

const ToggleThemeButton: React.FC = () => {
    const { toggleTheme, theme } = useThemeContext();
    const muiTheme = useTheme();

    return (
        <IconButton
            onClick={toggleTheme}
            sx={{
                color: theme.palette.mode === 'dark' ? muiTheme.palette.primary.contrastText : muiTheme.palette.primary.dark,
            }}
        >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default ToggleThemeButton;
