import React from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ClampButtonProps {
    side: 'left' | 'right';
    onClick: () => void;
    isOpen: boolean; // New prop to indicate if the panel is open
    sx?: SxProps<Theme>; // Allow sx prop to be passed
}

const ClampButton: React.FC<ClampButtonProps> = ({ side, onClick, isOpen, sx }) => {
    return (
        <IconButton onClick={onClick} sx={sx}>
            {side === 'left'
                ? (isOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />)
                : (isOpen ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />)
            }
        </IconButton>
    );
};

export default ClampButton;
