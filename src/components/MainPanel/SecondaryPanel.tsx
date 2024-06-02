import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Box, SxProps, Theme, Typography, useTheme} from '@mui/material';
import {useControlPanelContext} from '../../context/ControlPanelContext';
import ToolPanel from '../Menus/ToolPanel';
import DrawingCanvas, {DrawingCanvasRef} from '../Canvas/DrawingCanvas';
import {useTranslation} from 'react-i18next';

const SecondaryPanel: React.FC = () => {
    const {images, selectedImageIndex, addImage} = useControlPanelContext();
    const [selectedTool, setSelectedTool] = useState<string | null>('segment');
    const [contrastValue, setContrastValue] = useState<number>(1);
    const theme = useTheme();
    const selectedImage = images[selectedImageIndex]?.image;
    const canvasRef = useRef<DrawingCanvasRef>(null);
    const {t} = useTranslation();

    const handleToolSelect = useCallback((tool: string) => {
        setSelectedTool(tool);
    }, []);

    const handleClear = useCallback(() => {
        canvasRef.current?.clearCanvas();
    }, []);

    const handleContrastChange = useCallback((value: number) => {
        setContrastValue(value);
    }, []);

    const handleSave = useCallback(() => {
        const stage = canvasRef.current?.stageRef.current;
        if (stage) {
            const dataURL = stage.toDataURL();
            addImage(dataURL);
        }
    }, [addImage]);

    const handleDownload = useCallback(() => {
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
    }, []);

    const boxStyles: SxProps<Theme> = useMemo(() => ({
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        [theme.breakpoints.down('sm')]: {
            padding: 1,
        },
    }), [theme]);

    const innerBoxStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        overflow: 'auto',
    }), []);

    const noImageTextStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.text.primary,
    }), [theme]);

    return (
        <Box sx={boxStyles}>
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
                    <Box sx={innerBoxStyles}>
                        <DrawingCanvas ref={canvasRef} tool={selectedTool} image={selectedImage}
                                       contrastValue={contrastValue}/>
                    </Box>
                </>
            ) : (
                <Typography sx={noImageTextStyles}>
                    {t('no image placeholder')}
                </Typography>
            )}
        </Box>
    );
};

export default React.memo(SecondaryPanel);
