import React from 'react';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface RemoveButtonProps extends IconButtonProps {
    onClick: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, ...props }) => {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.error.main,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                ...props.sx,
            }}
            {...props}
        >
            <Delete />
        </IconButton>
    );
};

export default RemoveButton;
