import React from 'react';
import { Box, Slider, Typography, useTheme } from '@mui/material';
import { useControlPanelContext } from '../../context/ControlPanelContext';

const SliderControl: React.FC = () => {
    const { sliderValue, setSliderValue } = useControlPanelContext();
    const theme = useTheme();

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default }}>
            <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>
                Slider Control
            </Typography>
            <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="slider-control"
                sx={{
                    color: theme.palette.primary.main,
                    '& .MuiSlider-thumb': {
                        backgroundColor: theme.palette.primary.main,
                    },
                    '& .MuiSlider-rail': {
                        color: theme.palette.secondary.main,
                    },
                }}
            />
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                Value: {sliderValue}
            </Typography>
        </Box>
    );
};

export default SliderControl;
