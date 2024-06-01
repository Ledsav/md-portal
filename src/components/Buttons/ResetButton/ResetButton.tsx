import React from 'react';
import { Fab, useTheme } from '@mui/material';
import { useControlPanelContext } from '../../../context/ControlPanelContext';
import { useTranslation } from "react-i18next";
import RestoreIcon from '@mui/icons-material/Restore';

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
        <Fab
            color="primary"
            aria-label="reset"
            onClick={handleReset}
            sx={{
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
                zIndex: 2000,
            }}
        >
            <RestoreIcon />
        </Fab>
    );
};

export default ResetButton;
