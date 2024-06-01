import React from 'react';
import { Box, IconButton, Slider, Typography, Button, useTheme } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import ContrastIcon from '@mui/icons-material/Contrast';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import ClearButton from '../Buttons/ClearButton/ClearButton';
import { useTranslation } from 'react-i18next';

interface ToolPanelProps {
    onToolSelect: (tool: string) => void;
    onClear: () => void;
    contrastValue: number;
    onContrastChange: (value: number) => void;
    onSave: () => void;
    onDownload: () => void;
    selectedTool: string;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ onToolSelect, onClear, contrastValue, onContrastChange, onSave, onDownload, selectedTool }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const handleToolSelect = (tool: string) => {
        onToolSelect(tool);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        onContrastChange(newValue as number);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: theme.palette.primary.main, borderRadius: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 2 }}>
                <IconButton
                    onClick={() => handleToolSelect('segment')}
                    sx={{ color: selectedTool === 'segment' ? theme.palette.getContrastText(theme.palette.primary.main) : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <BrushIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleToolSelect('eraser')}
                    sx={{ color: selectedTool === 'eraser' ? theme.palette.getContrastText(theme.palette.primary.main) : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleToolSelect('contrast')}
                    sx={{ color: selectedTool === 'contrast' ? theme.palette.getContrastText(theme.palette.primary.main) : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <ContrastIcon />
                </IconButton>
            </Box>
            {selectedTool === 'contrast' && (
                <Box sx={{ padding: 2 }}>
                    <Typography gutterBottom sx={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}>
                        {t('Adjust Contrast')}
                    </Typography>
                    <Slider
                        value={contrastValue}
                        onChange={handleSliderChange}
                        aria-labelledby="contrast-slider"
                        sx={{
                            color: theme.palette.getContrastText(theme.palette.primary.main),
                            '& .MuiSlider-thumb': {
                                backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
                            },
                            '& .MuiSlider-rail': {
                                color: 'rgba(255, 255, 255, 0.5)',
                            },
                        }}
                    />
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button onClick={onSave} startIcon={<SaveIcon />} variant="contained" color="primary">
                    {t('Save')}
                </Button>
                <Button onClick={onDownload} startIcon={<DownloadIcon />} variant="contained" color="secondary">
                    {t('Download')}
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <ClearButton onClick={onClear} />
            </Box>
        </Box>
    );
};

export default ToolPanel;
