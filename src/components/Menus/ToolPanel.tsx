import React, {useCallback, useMemo, useState} from 'react';
import {Box, Button, IconButton, Slider, SxProps, Theme, Tooltip, Typography, useTheme} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import ContrastIcon from '@mui/icons-material/Contrast';
import PanToolIcon from '@mui/icons-material/PanTool';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import ClearButton from '../Buttons/ClearButton/ClearButton';
import {useTranslation} from 'react-i18next';

interface ToolPanelProps {
    onToolSelect: (tool: string) => void;
    onClear: () => void;
    contrastValue: number;
    onContrastChange: (value: number) => void;
    onSave: () => void;
    onDownload: () => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({
                                                 onToolSelect,
                                                 onClear,
                                                 contrastValue,
                                                 onContrastChange,
                                                 onSave,
                                                 onDownload,
                                             }) => {
    const [selectedTool, setSelectedTool] = useState<string>('segment');
    const theme = useTheme();
    const {t} = useTranslation();

    const handleToolSelect = useCallback((tool: string) => {
        setSelectedTool(tool);
        onToolSelect(tool);
    }, [onToolSelect]);

    const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
        onContrastChange(newValue as number);
    }, [onContrastChange]);

    const panelStyles: SxProps<Theme> = useMemo(() => ({
        padding: 2,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '8px',
    }), [theme]);

    const iconButtonStyles = useCallback((tool: string): SxProps<Theme> => ({
        color: selectedTool === tool
            ? theme.palette.getContrastText(theme.palette.primary.main)
            : 'rgba(255, 255, 255, 0.5)',
    }), [selectedTool, theme]);

    const contrastBoxStyles: SxProps<Theme> = useMemo(() => ({
        padding: 2,
    }), []);

    const typographyStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.getContrastText(theme.palette.primary.main),
    }), [theme]);

    const sliderStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.getContrastText(theme.palette.primary.main),
        '& .MuiSlider-thumb': {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
        },
        '& .MuiSlider-rail': {
            color: 'rgba(255, 255, 255, 0.5)',
        },
    }), [theme]);

    const buttonContainerStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
    }), []);

    const clearButtonContainerStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
    }), []);

    return (
        <Box sx={panelStyles}>
            <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom: 2}}>
                <Tooltip title={t('Draw')} arrow>
                    <IconButton onClick={() => handleToolSelect('segment')} sx={iconButtonStyles('segment')}>
                        <BrushIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('Erase')} arrow>
                    <IconButton onClick={() => handleToolSelect('eraser')} sx={iconButtonStyles('eraser')}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('Adjust Contrast')} arrow>
                    <IconButton onClick={() => handleToolSelect('contrast')} sx={iconButtonStyles('contrast')}>
                        <ContrastIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('Move')} arrow>
                    <IconButton onClick={() => handleToolSelect('move')} sx={iconButtonStyles('move')}>
                        <PanToolIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            {selectedTool === 'contrast' && (
                <Box sx={contrastBoxStyles}>
                    <Typography gutterBottom sx={typographyStyles}>
                        {t('Adjust Contrast')}
                    </Typography>
                    <Slider
                        value={contrastValue}
                        onChange={handleSliderChange}
                        aria-labelledby="contrast-slider"
                        sx={sliderStyles}
                    />
                </Box>
            )}
            <Box sx={buttonContainerStyles}>
                <Button onClick={onSave} startIcon={<SaveIcon/>} variant="contained" color="primary">
                    {t('Save')}
                </Button>
                <Button onClick={onDownload} startIcon={<DownloadIcon/>} variant="contained" color="secondary">
                    {t('Download')}
                </Button>
            </Box>
            <Box sx={clearButtonContainerStyles}>
                <ClearButton onClick={onClear}/>
            </Box>
        </Box>
    );
};

export default React.memo(ToolPanel);
