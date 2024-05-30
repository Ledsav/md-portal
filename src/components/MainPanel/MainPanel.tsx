import React from 'react';
import { Box } from '@mui/material';

const MainPanel: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                backgroundColor: 'white',
                overflow: 'auto', // Enable scrolling if content overflows
            }}
        >
            {/* Main Content */}
        </Box>
    );
};

export default MainPanel;
