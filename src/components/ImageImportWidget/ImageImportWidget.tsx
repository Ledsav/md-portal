// components/ImageImportWidget/ImageImportWidget.tsx
import React, { useRef } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useControlPanelContext } from '../../context/ControlPanelContext';
import useImageImport from '../../hooks/useImageImport';
import RemoveButton from '../Buttons/RemoveButton/RemoveButton';

const ImageImportWidget: React.FC = () => {
    const { images, removeImage } = useControlPanelContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { handleImageImport } = useImageImport();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageImport(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'auto', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <IconButton
                    onClick={handleClick}
                    sx={{
                        width: 120,
                        height: 120,
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    <AddPhotoAlternate sx={{ fontSize: 50, color: '#888' }} />
                    <Typography variant="caption" sx={{ color: '#888' }}>
                        Import Photo
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ padding: 1 }}>
                {images.map((image, index) => (
                    <Grid item key={index} xs={6} sm={4} md={3}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '100%',
                                position: 'relative',
                                border: '2px solid #ccc',
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={image}
                                alt={`imported-${index}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ImageImportWidget;
