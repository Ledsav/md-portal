// src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import MainPanel from '../components/MainPanel/MainPanel';
import SidePanel from '../components/SidePanel/SidePanel';
import SliderControl from '../components/SliderControl/SliderControl';
import TreeViewControl from '../components/TreeViewControl/TreeViewControl';
import ImportDialog from '../components/Dialogs/ImportDialog/ImportDialog';
import ImportButton from '../components/Buttons/ImportButton/ImportButton';
import ImportResultDialog from '../components/Dialogs/ImportResultDialog/ImportResultDialog';
import ImageImportWidget from '../components/ImageImportWidget/ImageImportWidget';
import { ControlPanelProvider, useControlPanelContext } from '../context/ControlPanelContext';
import useImageImport from '../hooks/useImageImport';
import { ThemeProvider } from "../context/ThemeContext";
import ToggleThemeButton from "../components/Buttons/ToggleThemeButton/ToggleThemeButton";
import ResetButton from "../components/Buttons/ResetButton/ResetButton";
import LanguageSwitcher from '../components/Menus/LanguageSwitcher';

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { image, handleImageImport, resultDialogOpen, setResultDialogOpen, importSuccess, importMessage } = useImageImport();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        leftPanelOpen,
        setLeftPanelOpen,
        rightPanelOpen,
        setRightPanelOpen
    } = useControlPanelContext();

    const handleDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        handleImageImport(file);
        setOpen(false);
    };

    const handleLeftPanelToggle = () => {
        if (isMobile && !leftPanelOpen) {
            setRightPanelOpen(false);
        }
        setLeftPanelOpen(!leftPanelOpen);
    };

    const handleRightPanelToggle = () => {
        if (isMobile && !rightPanelOpen) {
            setLeftPanelOpen(false);
        }
        setRightPanelOpen(!rightPanelOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar leftComponent={<ResetButton />}>
                <LanguageSwitcher />
                <ToggleThemeButton />
            </TopBar>
            <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
                <SidePanel
                    side="left"
                    isOpen={leftPanelOpen}
                    togglePanel={handleLeftPanelToggle}
                >
                    <SliderControl />
                    <TreeViewControl />
                </SidePanel>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        transition: 'margin 0.3s',
                        marginLeft: leftPanelOpen && !isMobile ? '240px' : '0',
                        marginRight: rightPanelOpen && !isMobile ? '240px' : '0',
                        position: 'relative', // Ensures that overlay panels on mobile don't affect layout
                    }}
                >
                    <MainPanel />
                </Box>
                <SidePanel
                    side="right"
                    isOpen={rightPanelOpen}
                    togglePanel={handleRightPanelToggle}
                >
                    <ImportButton onClick={() => setOpen(true)} />
                    <ImageImportWidget />
                </SidePanel>
            </Box>
            <ImportDialog open={open} onClose={() => setOpen(false)} onDrop={handleDrop} />
            <ImportResultDialog open={resultDialogOpen} onClose={() => setResultDialogOpen(false)} success={importSuccess} message={importMessage} />
        </Box>
    );
};

const MainLayoutWithProvider: React.FC = () => (
    <ControlPanelProvider>
        <ThemeProvider>
            <MainLayout />
        </ThemeProvider>
    </ControlPanelProvider>
);

export default MainLayoutWithProvider;
