import React from 'react';
import { Tabs, Tab, useTheme } from '@mui/material';

interface TabComponentProps {
    currentTab: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({ currentTab, onChange }) => {
    const theme = useTheme();

    return (
        <Tabs
            value={currentTab}
            onChange={onChange}
            indicatorColor="primary"
            textColor="inherit"
            centered
            sx={{
                '& .MuiTab-root': {
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                    backgroundColor: theme.palette.primary.main,
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                    },
                },
            }}
        >
            <Tab label="Image Gallery" />
            <Tab label="Edit Canvas" />
        </Tabs>
    );
};

export default TabComponent;
