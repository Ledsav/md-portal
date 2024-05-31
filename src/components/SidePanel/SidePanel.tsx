import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import ClampButton from '../Buttons/ClampButton/ClampButton';

interface SidePanelProps {
    side: 'left' | 'right';
    isOpen: boolean;
    togglePanel: () => void;
    children?: React.ReactNode; // Accept children components
    sx?: SxProps<Theme>; // Optional sx prop
}

const SidePanel: React.FC<SidePanelProps> = ({ side, isOpen, togglePanel, children, sx }) => {
    const theme = useTheme();

    return (
        <Box sx={{ position: 'relative', height: '100%', ...sx }}>
            <Box
                sx={{
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
                }}
            >
                {isOpen && (
                    <Box sx={{ width: '240px', height: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {children} {/* Render children components */}
                    </Box>
                )}
            </Box>
            <ClampButton
                side={side}
                onClick={togglePanel}
                isOpen={isOpen}
                sx={{
                    position: 'absolute',
                    top: '5%',
                    transform: 'translateY(-50%)',
                    [side]: isOpen ? '240px' : '0px',
                    transition: 'all 0.3s',
                    zIndex: 1,
                    color: theme.palette.primary.main, // Set the icon color
                    backgroundColor: theme.palette.background.default, // Set the background color
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover, // Optional: Set a hover effect
                    },
                }}
            />
        </Box>
    );
};

export default SidePanel;
