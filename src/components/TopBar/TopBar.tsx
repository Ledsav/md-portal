// TopBar.tsx

import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

interface TopBarProps {
    children?: ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box>{children}</Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
