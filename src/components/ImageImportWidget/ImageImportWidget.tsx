import React, {useMemo, useRef} from 'react';
import {Box, Grid, IconButton, SxProps, Theme, Typography, useTheme} from '@mui/material';
import {AddPhotoAlternate} from '@mui/icons-material';
import {useControlPanelContext} from '../../context/ControlPanelContext';
import useImageImport from '../../hooks/useImageImport';
import {useTranslation} from "react-i18next";

const ImageImportWidget: React.FC = () => {
    const {images} = useControlPanelContext();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {handleImageImport} = useImageImport();
    const theme = useTheme();
    const {t} = useTranslation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageImport(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const iconButtonStyles: SxProps<Theme> = useMemo(() => ({
        width: 120,
        height: 120,
        border: `2px dashed ${theme.palette.text.secondary}`,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
    }), [theme]);

    const addPhotoIconStyles: SxProps<Theme> = useMemo(() => ({
        fontSize: 50,
        color: theme.palette.text.secondary,
    }), [theme]);

    const captionStyles: SxProps<Theme> = useMemo(() => ({
        color: theme.palette.text.secondary,
    }), [theme]);

    const gridItemStyles: SxProps<Theme> = useMemo(() => ({
        width: '100%',
        height: 0,
        paddingBottom: '100%',
        position: 'relative',
        border: `2px solid ${theme.palette.text.secondary}`,
        borderRadius: '8px',
        overflow: 'hidden',
    }), [theme]);

    const imgStyles: React.CSSProperties = useMemo(() => ({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '8px',
    }), []);

    return (
        <Box sx={{width: '100%', height: '100%', overflow: 'auto', padding: 2}}>
            <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 2}}>
                <IconButton onClick={handleClick} sx={iconButtonStyles}>
                    <AddPhotoAlternate sx={addPhotoIconStyles}/>
                    <Typography variant="caption" sx={captionStyles}>
                        {t('import photo')}
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{padding: 1}}>
                {images.map((image) => (
                    <Grid item key={image.id} xs={6} sm={4} md={3}>
                        <Box sx={gridItemStyles}>
                            <img
                                src={image.image}
                                alt={`imported-${image.id}`}
                                style={imgStyles}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default React.memo(ImageImportWidget);
