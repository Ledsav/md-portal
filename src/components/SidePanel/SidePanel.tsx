import React, {useMemo} from 'react';
import {Box, SxProps, Theme, useTheme} from '@mui/material';
import ClampButton from '../Buttons/ClampButton/ClampButton';

interface SidePanelProps {
    side: 'left' | 'right';
    isOpen: boolean;
    togglePanel: () => void;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

const SidePanel: React.FC<SidePanelProps> = ({side, isOpen, togglePanel, children, sx}) => {
    const theme = useTheme();

    const panelStyles: SxProps<Theme> = useMemo(() => ({
        position: 'relative',
        height: '100%',
        ...sx,
    }), [sx]);

    const innerPanelStyles: SxProps<Theme> = useMemo(() => ({
        width: isOpen ? '240px' : '0px',
        transition: 'width 0.3s',
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: isOpen ? 1200 : 0,
    }), [isOpen, side, theme]);

    const contentBoxStyles: SxProps<Theme> = useMemo(() => ({
        width: '240px',
        height: '100%',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }), []);

    const clampButtonStyles: SxProps<Theme> = useMemo(() => ({
        position: 'absolute',
        top: '5%',
        transform: 'translateY(-50%)',
        [side]: isOpen ? '240px' : '0px',
        transition: 'all 0.3s',
        zIndex: 1,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    }), [isOpen, side, theme]);

    return (
        <Box sx={panelStyles}>
            <Box sx={innerPanelStyles}>
                {isOpen && (
                    <Box sx={contentBoxStyles}>
                        {children}
                    </Box>
                )}
            </Box>
            <ClampButton
                side={side}
                onClick={togglePanel}
                isOpen={isOpen}
                sx={clampButtonStyles}
            />
        </Box>
    );
};

export default React.memo(SidePanel);
