import React from 'react';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={onClick}
            startIcon={<ClearIcon />}
        >
            Clear
        </Button>
    );
};

export default ClearButton;
