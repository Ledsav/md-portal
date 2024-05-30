import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Medical Visualization</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
