import React from 'react';
import { Button, useTheme } from '@mui/material';
import { useControlPanelContext } from '../../../context/ControlPanelContext';
import {useTranslation} from "react-i18next";

const ResetButton: React.FC = () => {
    const theme = useTheme();
    const { setSliderValue, setExpanded, setLeftPanelOpen, setRightPanelOpen, setImages, resetData } = useControlPanelContext();
    const { t } = useTranslation();

    const handleReset = () => {
        setSliderValue(30);
        setExpanded([]);
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setImages([]);
        localStorage.clear();
        resetData();
    };

    return (
        <Button
            variant="contained"
            onClick={handleReset}
            sx={{
                color: theme.palette.getContrastText(theme.palette.primary.main),
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            }}
        >
            {t('reset all')}
        </Button>
    );
};

export default ResetButton;
