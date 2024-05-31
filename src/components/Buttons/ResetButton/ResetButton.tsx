import React from 'react';
import { Button } from '@mui/material';
import {useControlPanelContext} from "../../../context/ControlPanelContext";

const ResetButton: React.FC = () => {
    const { setSliderValue, setExpanded, setLeftPanelOpen, setRightPanelOpen, setImages } = useControlPanelContext();

    const handleReset = () => {
        setSliderValue(30);
        setExpanded([]);
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setImages([]);
        localStorage.clear(); // Clear all data from local storage
    };

    return (
        <Button variant="contained" onClick={handleReset}>
            Reset All
        </Button>
    );
};

export default ResetButton;
