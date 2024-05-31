import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface MainPanelProps {
    image: string | null;
}

const MainPanel: React.FC<MainPanelProps> = ({ image }) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.onload = () => {
                setImageDimensions({ width: img.width, height: img.height });
            };
            img.src = image;
        }
    }, [image]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                backgroundColor: 'white',
                overflow: 'auto',
            }}
        >
            {image ? (
                <>
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    {imageDimensions && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Dimensions: {imageDimensions.width}px x {imageDimensions.height}px
                        </Typography>
                    )}
                </>
            ) : (
                <Typography>No image uploaded.</Typography>
            )}
        </Box>
    );
};

export default MainPanel;
