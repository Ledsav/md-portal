import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
    toggleTheme: () => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#69A1B6',
            main: '#467597',
            dark: '#305368',
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: '#8BB5C8',
            main: '#6094B0',
            dark: '#3B657A',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#E8ECEF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1B2A30',
            secondary: '#6E7B80',
            disabled: '#A1A9B1',
        },
        action: {
            active: '#467597',
            hover: '#69A1B6',
            selected: '#6094B0',
            disabled: '#A1A9B1',
            disabledBackground: '#E0E6EB',
        },
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#FFA000',
        },
        info: {
            main: '#1976D2',
        },
        success: {
            main: '#388E3C',
        },
        divider: '#E0E6EB',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#6AA7C2',
            main: '#4D87A8',
            dark: '#346183',
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: '#98BCD0',
            main: '#7CA0BB',
            dark: '#527285',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#1A2A30',
            paper: '#1C2A2F',
        },
        text: {
            primary: '#E0E6EB',
            secondary: '#A1A9B1',
            disabled: '#6E7B80',
        },
        action: {
            active: '#4D87A8',
            hover: '#6AA7C2',
            selected: '#7CA0BB',
            disabled: '#6E7B80',
            disabledBackground: '#1A2A30',
        },
        error: {
            main: '#F44336',
        },
        warning: {
            main: '#FFA726',
        },
        info: {
            main: '#29B6F6',
        },
        success: {
            main: '#66BB6A',
        },
        divider: '#A1A9B1',
    },
});

interface ThemeProviderProps {
    children: ReactNode;
}

const THEME_KEY = 'selectedTheme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(darkTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme.palette.mode === 'light' ? darkTheme : lightTheme;
            localStorage.setItem(THEME_KEY, newTheme.palette.mode);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
