import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useControlPanelContext } from '../../context/ControlPanelContext';

const SliderControl: React.FC = () => {
    const { sliderValue, setSliderValue } = useControlPanelContext();

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    return (
        <Box>
            <Typography gutterBottom>Slider Control</Typography>
            <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="slider-control"
            />
            <Typography variant="body2">Value: {sliderValue}</Typography>
        </Box>
    );
};

export default SliderControl;
