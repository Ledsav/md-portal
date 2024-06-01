import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';
import logo from '../../assets/images/In_app_logo.png';

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
            <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
                    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
                    {leftComponent}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'center', flexGrow: 1, mt: isMobile ? 1 : 0 }}>
                    {centerComponent}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 1 : 0 }}>
                    {rightComponent}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
