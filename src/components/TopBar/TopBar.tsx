import React, {ReactNode, useMemo} from 'react';
import {AppBar, Box, SxProps, Theme, Toolbar, useMediaQuery, useTheme} from '@mui/material';
import logo from '../../assets/images/In_app_logo.png';

interface TopBarProps {
    leftComponent?: ReactNode;
    centerComponent?: ReactNode;
    rightComponent?: ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({leftComponent, centerComponent, rightComponent}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const appBarStyles: SxProps<Theme> = useMemo(() => ({
        backgroundColor: theme.palette.primary.main,
    }), [theme]);

    const toolbarStyles: SxProps<Theme> = useMemo(() => ({
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    }), [isMobile]);

    const leftBoxStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        alignItems: 'center',
        width: isMobile ? '100%' : 'auto',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
    }), [isMobile]);

    const centerBoxStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        mt: isMobile ? 1 : 0,
    }), [isMobile]);

    const rightBoxStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        alignItems: 'center',
        mt: isMobile ? 1 : 0,
    }), [isMobile]);

    return (
        <AppBar position="static" sx={appBarStyles}>
            <Toolbar sx={toolbarStyles}>
                <Box sx={leftBoxStyles}>
                    <img src={logo} alt="Logo" style={{height: '40px', marginRight: '16px'}}/>
                    {leftComponent}
                </Box>
                <Box sx={centerBoxStyles}>
                    {centerComponent}
                </Box>
                <Box sx={rightBoxStyles}>
                    {rightComponent}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default React.memo(TopBar);
