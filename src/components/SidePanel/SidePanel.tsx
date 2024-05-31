import React from 'react';
import { Box } from '@mui/material';
import ClampButton from '../Buttons/ClampButton/ClampButton';

interface SidePanelProps {
    side: 'left' | 'right';
    isOpen: boolean;
    togglePanel: () => void;
    children?: React.ReactNode; // Accept children components
}

const SidePanel: React.FC<SidePanelProps> = ({ side, isOpen, togglePanel, children }) => {
    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
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
                    backgroundColor: 'grey.100',
                }}
            >
                {isOpen && (
                    <Box sx={{ width: '240px', height: '100%', padding: 2 }}>
                        {children} {/* Render children components */}
                    </Box>
                )}
            </Box>
            <ClampButton
                side={side}
                onClick={togglePanel}
                isOpen={isOpen} // Pass isOpen state as a prop
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    [side]: isOpen ? '240px' : '0px',
                    transition: 'all 0.3s',
                    zIndex: 1,
                }}
            />
        </Box>
    );
};

export default SidePanel;
