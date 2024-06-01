import React, { useState, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useControlPanelContext } from '../../context/ControlPanelContext';
import ToolPanel from '../Menus/ToolPanel';
import DrawingCanvas, { DrawingCanvasRef } from '../Canvas/DrawingCanvas';
import { useTranslation } from 'react-i18next';

const SecondaryPanel: React.FC = () => {
    const { images, selectedImageIndex, addImage } = useControlPanelContext();
    const [selectedTool, setSelectedTool] = useState<string | null>('segment');
    const [contrastValue, setContrastValue] = useState<number>(1); // State for contrast value
    const theme = useTheme();
    const selectedImage = images[selectedImageIndex]?.image;
    const canvasRef = useRef<DrawingCanvasRef>(null);
    const { t } = useTranslation();  // Use the translation hook

    const handleToolSelect = (tool: string) => {
        setSelectedTool(tool);
    };

    const handleClear = () => {
        canvasRef.current?.clearCanvas();
    };

    const handleContrastChange = (value: number) => {
        setContrastValue(value);
    };

    const handleSave = () => {
        const stage = canvasRef.current?.stageRef.current;
        if (stage) {
            const dataURL = stage.toDataURL();
            addImage(dataURL);
        }
    };

    const handleDownload = () => {
        const stage = canvasRef.current?.stageRef.current;
        if (stage) {
            const dataURL = stage.toDataURL();
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <Box
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                [theme.breakpoints.down('sm')]: {
                    padding: 1,
                },
            }}
        >
            {selectedImage ? (
                <>
                    <ToolPanel
                        onToolSelect={handleToolSelect}
                        onClear={handleClear}
                        contrastValue={contrastValue}
                        onContrastChange={handleContrastChange}
                        onSave={handleSave}
                        onDownload={handleDownload}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '100%',
                            overflow: 'auto',
                        }}
                    >
                        <DrawingCanvas ref={canvasRef} tool={selectedTool} image={selectedImage} contrastValue={contrastValue} />
                    </Box>
                </>
            ) : (
                <Typography sx={{ color: theme.palette.text.primary }}>
                    {t('no image placeholder')}
                </Typography>
            )}
        </Box>
    );
};

export default SecondaryPanel;
