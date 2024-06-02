import React, {useMemo} from 'react';
import {IconButton, IconButtonProps, SxProps, Theme, useTheme} from '@mui/material';
import {Delete} from '@mui/icons-material';

interface RemoveButtonProps extends IconButtonProps {
    onClick?: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> =
    ({
         onClick = () => {
         },
         sx,
         ...props
     }) => {
        const theme = useTheme();

        const buttonStyles: SxProps<Theme> = useMemo(() => ({
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            ...sx,
        }), [theme, sx]);

        return (
            <IconButton
                onClick={onClick}
                sx={buttonStyles}
                {...props}
            >
                <Delete/>
            </IconButton>
        );
    };

export default React.memo(RemoveButton);
