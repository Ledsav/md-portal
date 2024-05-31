// components/ImageImportWidget/ImageImportWidget.tsx

import React, { useRef } from 'react';
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useControlPanelContext } from '../../context/ControlPanelContext';
import useImageImport from '../../hooks/useImageImport';
import {useTranslation} from "react-i18next";

const ImageImportWidget: React.FC = () => {
    const { images } = useControlPanelContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { handleImageImport } = useImageImport();
    const theme = useTheme();
    const { t } = useTranslation();

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
                        border: `2px dashed ${theme.palette.text.secondary}`,
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <AddPhotoAlternate sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        {t('import photo')}
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
                {images.map((image) => (
                    <Grid item key={image.id} xs={6} sm={4} md={3}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '100%',
                                position: 'relative',
                                border: `2px solid ${theme.palette.text.secondary}`,
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={image.image}
                                alt={`imported-${image.id}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    borderRadius: '8px'
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
