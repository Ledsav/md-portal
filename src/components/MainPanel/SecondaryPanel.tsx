import React, { useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useControlPanelContext } from '../../context/ControlPanelContext';
import ToolPanel from '../Menus/ToolPanel';
import DrawingCanvas, { DrawingCanvasRef } from '../Canvas/DrawingCanvas';
import { useTranslation } from 'react-i18next';

const SecondaryPanel: React.FC = () => {
    const {
        images,
        selectedImageIndex,
        addImage,
        selectedTool,
        setSelectedTool,
        contrastValue,
        setContrastValue,
        canvasLines,
        setCanvasLines,
    } = useControlPanelContext();
    const theme = useTheme();
    const selectedImage = images[selectedImageIndex]?.image;
    const canvasRef = useRef<DrawingCanvasRef>(null);
    const { t } = useTranslation();

    const handleToolSelect = (tool: string) => {
        setSelectedTool(tool);
    };

    const handleClear = () => {
        canvasRef.current?.clearCanvas();
        setCanvasLines([]);
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

    useEffect(() => {
        handleClear();
    }, [selectedImage]);

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
                        selectedTool={selectedTool || 'segment'}  // Provide default value if null
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
                        <DrawingCanvas
                            ref={canvasRef}
                            tool={selectedTool || 'segment'}  // Provide default value if null
                            image={selectedImage}
                            contrastValue={contrastValue}
                            lines={canvasLines}
                            setLines={setCanvasLines}
                        />
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
