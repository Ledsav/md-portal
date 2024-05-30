import React from 'react';
import { Box } from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import MainPanel from '../components/MainPanel/MainPanel';
import SidePanel from '../components/SidePanel/SidePanel';

const MainLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <SidePanel side="left" />
                <MainPanel />
                <SidePanel side="right" />
            </Box>
        </Box>
    );
};

export default MainLayout;
