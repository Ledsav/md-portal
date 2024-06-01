import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';

interface TopBarProps {
    leftComponent?: ReactNode;
    centerComponent?: ReactNode;
    rightComponent?: ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ leftComponent, centerComponent, rightComponent }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
                    {leftComponent}
                    {isMobile && <Box sx={{ flexGrow: 1 }} />}
                    {rightComponent}
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'center', alignItems: 'center', mt: isMobile ? 1 : 0 }}>
                    {centerComponent}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
