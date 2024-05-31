// src/components/TopBar/TopBar.tsx
import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Box, useTheme } from '@mui/material';

interface TopBarProps {
    leftComponent?: ReactNode;
    children?: ReactNode; // Allow children to be passed
}

const TopBar: React.FC<TopBarProps> = ({ leftComponent, children }) => {
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    {leftComponent}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {children}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
