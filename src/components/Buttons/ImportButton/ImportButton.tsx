import React from 'react';
import { Button } from '@mui/material';

interface ImportButtonProps {
    onClick: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onClick }) => {
    return (
        <Button variant="contained" onClick={onClick}>
            Import Photo
        </Button>
    );
};

export default ImportButton;
