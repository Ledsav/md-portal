import React from 'react';
import { Tabs, Tab, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TabComponentProps {
    currentTab: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({ currentTab, onChange }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Tabs
            value={currentTab}
            onChange={onChange}
            indicatorColor="primary"
            textColor="inherit"
            centered
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
                '& .MuiTab-root': {
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: theme.shape.borderRadius,
                    margin: theme.spacing(0.5),
                    padding: theme.spacing(1, 2),
                    minWidth: '120px',
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                    },
                },
                '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                },
            }}
        >
            <Tab label={t('Image Gallery')} />
            <Tab label={t('Edit Image')} />
        </Tabs>
    );
};

export default TabComponent;
