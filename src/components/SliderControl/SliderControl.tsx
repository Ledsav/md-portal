import React, {useCallback, useMemo} from 'react';
import {Box, Slider, SxProps, Theme, Typography, useTheme} from '@mui/material';
import {useControlPanelContext} from '../../context/ControlPanelContext';
import {useTranslation} from 'react-i18next';

const SliderControl: React.FC = () => {
    const {sliderValue, setSliderValue} = useControlPanelContext();
    const theme = useTheme();
    const {t} = useTranslation();

    const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    }, [setSliderValue]);

    const boxStyles: SxProps<Theme> = useMemo(() => ({
        padding: 2,
        backgroundColor: theme.palette.background.default,
    }), [theme]);

    const typographyStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.text.primary,
    }), [theme]);

    const sliderStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.primary.main,
        '& .MuiSlider-thumb': {
            backgroundColor: theme.palette.primary.main,
        },
        '& .MuiSlider-rail': {
            color: theme.palette.secondary.main,
        },
    }), [theme]);

    return (
        <Box sx={boxStyles}>
            <Typography gutterBottom sx={typographyStyles}>
                {t('Slider Control')}
            </Typography>
            <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="slider-control"
                sx={sliderStyles}
            />
            <Typography variant="body2" sx={typographyStyles}>
                {t('Value')}: {sliderValue}
            </Typography>
        </Box>
    );
};

export default React.memo(SliderControl);
