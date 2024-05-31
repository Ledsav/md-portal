import React from 'react';
import { Button, Box } from '@mui/material';

interface ImportButtonProps {
    onClick: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onClick }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Button variant="contained" onClick={onClick}>
                Import Photo
            </Button>
        </Box>
    );
};

export default ImportButton;
