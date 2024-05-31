// components/MainPanel/MainPanel.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useControlPanelContext } from "../../context/ControlPanelContext";
import RemoveButton from '../Buttons/RemoveButton/RemoveButton';

const MainPanel: React.FC = () => {
    const { images, removeImage } = useControlPanelContext();
    const [imageDimensions, setImageDimensions] = useState<{ [key: number]: { width: number, height: number } }>({});

    useEffect(() => {
        const calculateDimensions = () => {
            const dimensions: { [key: number]: { width: number, height: number } } = {};
            images.forEach((image, index) => {
                const img = new Image();
                img.onload = () => {
                    dimensions[index] = { width: img.width, height: img.height };
                    if (Object.keys(dimensions).length === images.length) {
                        setImageDimensions(dimensions);
                    }
                };
                img.src = image;
            });
        };
        calculateDimensions();
    }, [images]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 10,
                backgroundColor: 'white',
                overflow: 'auto',
            }}
        >
            {images.length > 0 ? (
                <Grid container spacing={2}>
                    {images.map((image: string, index: number) => (
                        <Grid item key={index} xs={12 / Math.min(images.length, 2)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <img src={image} alt={`imported-${index}`} style={{ width: '100%', height: 'auto' }} />
                                {imageDimensions[index] && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Dimensions: {imageDimensions[index].width}px x {imageDimensions[index].height}px
                                    </Typography>
                                )}
                                <RemoveButton onClick={() => removeImage(index)} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No images imported.</Typography>
            )}
        </Box>
    );
};

export default MainPanel;
