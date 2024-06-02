import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Grid, SxProps, Theme, Typography, useTheme} from '@mui/material';
import {useControlPanelContext} from "../../context/ControlPanelContext";
import RemoveButton from '../Buttons/RemoveButton/RemoveButton';
import {useTranslation} from "react-i18next";

const MainPanel: React.FC = () => {
    const {images, removeImage, selectedImageIndex, selectImage} = useControlPanelContext();
    const [imageDimensions, setImageDimensions] = useState<{ [key: number]: { width: number, height: number } }>({});
    const theme = useTheme();
    const {t} = useTranslation();

    useEffect(() => {
        const calculateDimensions = () => {
            const dimensions: { [key: number]: { width: number, height: number } } = {};
            images.forEach((image) => {
                const img = new Image();
                img.onload = () => {
                    dimensions[image.id] = {width: img.width, height: img.height};
                    if (Object.keys(dimensions).length === images.length) {
                        setImageDimensions(dimensions);
                    }
                };
                img.src = image.image;
            });
        };
        calculateDimensions();
    }, [images]);

    const boxStyles: SxProps<Theme> = useMemo(() => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 2,
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            p: 1,
        },
    }), [theme]);

    const gridItemStyles = useCallback((selected: boolean): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
        borderRadius: theme.shape.borderRadius,
        boxShadow: selected ? `0px 0px 10px ${theme.palette.primary.main}` : '0px 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, border 0.3s',
    }), [theme]);

    const imgStyles = useMemo(() => ({
        width: '100%',
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
    }), [theme]);

    const typographyStyles = useMemo(() => ({
        mt: 1,
        color: theme.palette.text.primary,
    }), [theme]);

    return (
        <Box sx={boxStyles}>
            {images.length > 0 ? (
                <Grid container spacing={2}>
                    {images.map((image, index) => (
                        <Grid item key={image.id} xs={12 / Math.min(images.length, 2)}>
                            <Box sx={gridItemStyles(selectedImageIndex === index)} onClick={() => selectImage(index)}>
                                <img src={image.image} alt={`imported-${image.id}`} style={imgStyles}/>
                                {imageDimensions[image.id] && (
                                    <Typography variant="body2" sx={typographyStyles}>
                                        {t('dimensions')}: {imageDimensions[image.id].width}px
                                        x {imageDimensions[image.id].height}px
                                    </Typography>
                                )}
                                <RemoveButton onClick={() => removeImage(image.id)}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{color: theme.palette.text.primary}}>{t('no image placeholder')}</Typography>
            )}
        </Box>
    );
};

export default MainPanel;
