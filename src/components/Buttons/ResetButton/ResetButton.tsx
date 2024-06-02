import React, {useMemo} from 'react';
import {Fab, SxProps, Theme, useTheme} from '@mui/material';
import {useControlPanelContext} from '../../../context/ControlPanelContext';
import RestoreIcon from '@mui/icons-material/Restore';

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
        <Fab
            color="primary"
            aria-label="reset"
            onClick={handleReset}
            sx={fabStyles}
        >
            <RestoreIcon/>
        </Fab>
    );
};

export default React.memo(ResetButton);
