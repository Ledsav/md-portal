import React from 'react';
import {IconButton, SxProps, Theme} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ClampButtonProps {
    side: 'left' | 'right';
    onClick: () => void;
    isOpen: boolean;
    sx?: SxProps<Theme>;
}

const ClampButton: React.FC<ClampButtonProps> = ({side, onClick, isOpen, sx = {}}) => {
    const icon = side === 'left'
        ? isOpen ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>
        : isOpen ? <ArrowForwardIosIcon/> : <ArrowBackIosIcon/>;

    return (
        <IconButton onClick={onClick} sx={sx}>
            {icon}
        </IconButton>
    );
};

export default React.memo(ClampButton);
