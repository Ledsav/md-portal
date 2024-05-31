// components/Buttons/RemoveButton.tsx
import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface RemoveButtonProps extends IconButtonProps {
    onClick: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, ...props }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                },
                ...props.sx
            }}
            {...props}
        >
            <Delete />
        </IconButton>
    );
};

export default RemoveButton;
