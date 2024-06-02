import React, {useMemo} from 'react';
import {Fab, SxProps, Theme, Tooltip, useTheme} from '@mui/material';
import {useControlPanelContext} from '../../../context/ControlPanelContext';
import RestoreIcon from '@mui/icons-material/Restore';
import {useTranslation} from "react-i18next";

const ResetButton: React.FC = () => {
    const theme = useTheme();
    const {
        setSliderValue,
        setExpanded,
        setLeftPanelOpen,
        setRightPanelOpen,
        setImages,
        resetData,
    } = useControlPanelContext();
    const {t} = useTranslation();

    const handleReset = () => {
        setSliderValue(30);
        setExpanded([]);
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setImages([]);
        localStorage.clear();
        resetData();
    };

    const fabStyles: SxProps<Theme> = useMemo(() => ({
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 2000,
    }), [theme]);

    return (
        <Tooltip title={t('reset all')} arrow>
            <Fab
                color="primary"
                aria-label="reset"
                onClick={handleReset}
                sx={fabStyles}
            >
                <RestoreIcon/>
            </Fab>
        </Tooltip>
    );
};

export default React.memo(ResetButton);
