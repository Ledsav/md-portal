import React, { useState } from 'react';
import { Box, IconButton, Slider, Typography, Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import ContrastIcon from '@mui/icons-material/Contrast';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import ClearButton from '../Buttons/ClearButton/ClearButton';

interface ToolPanelProps {
    onToolSelect: (tool: string) => void;
    onClear: () => void;
    contrastValue: number;
    onContrastChange: (value: number) => void;
    onSave: () => void;
    onDownload: () => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ onToolSelect, onClear, contrastValue, onContrastChange, onSave, onDownload }) => {
    const [selectedTool, setSelectedTool] = useState<string>('segment');

    const handleToolSelect = (tool: string) => {
        setSelectedTool(tool);
        onToolSelect(tool);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        onContrastChange(newValue as number);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: '#004d6b', borderRadius: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 2 }}>
                <IconButton
                    onClick={() => handleToolSelect('segment')}
                    sx={{ color: selectedTool === 'segment' ? '#fff' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <BrushIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleToolSelect('eraser')}
                    sx={{ color: selectedTool === 'eraser' ? '#fff' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleToolSelect('contrast')}
                    sx={{ color: selectedTool === 'contrast' ? '#fff' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <ContrastIcon />
                </IconButton>
            </Box>
            {selectedTool === 'contrast' && (
                <Box sx={{ padding: 2 }}>
                    <Typography gutterBottom sx={{ color: '#fff' }}>
                        Adjust Contrast
                    </Typography>
                    <Slider
                        value={contrastValue}
                        onChange={handleSliderChange}
                        aria-labelledby="contrast-slider"
                        sx={{
                            color: '#fff',
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#fff',
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
                    Save
                </Button>
                <Button onClick={onDownload} startIcon={<DownloadIcon />} variant="contained" color="secondary">
                    Download
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <ClearButton onClick={onClear} />
            </Box>
        </Box>
    );
};

export default ToolPanel;
