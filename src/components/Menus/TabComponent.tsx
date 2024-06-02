import React, {useMemo} from 'react';
import {SxProps, Tab, Tabs, Theme, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface TabComponentProps {
    currentTab: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({currentTab, onChange}) => {
    const theme = useTheme();
    const {t} = useTranslation();

    const tabsStyles: SxProps<Theme> = useMemo(() => ({
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
    }), [theme]);

    return (
        <Tabs
            value={currentTab}
            onChange={onChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={tabsStyles}
        >
            <Tab label={t('Image Gallery')}/>
            <Tab label={t('Edit Image')}/>
        </Tabs>
    );
};

export default React.memo(TabComponent);
