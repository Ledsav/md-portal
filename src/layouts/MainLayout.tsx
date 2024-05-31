import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import MainPanel from '../components/MainPanel/MainPanel';
import SidePanel from '../components/SidePanel/SidePanel';
import SliderControl from '../components/SliderControl/SliderControl';
import TreeViewControl from '../components/TreeViewControl/TreeViewControl';
import ImportDialog from '../components/ImportDialog/ImportDialog';
import ImportButton from '../components/Buttons/ImportButton/ImportButton';
import { ControlPanelProvider, useControlPanelContext } from '../context/ControlPanelContext';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtil';

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(loadFromLocalStorage('uploadedImage'));

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
        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result as string;
            setImage(imageData);
            saveToLocalStorage('uploadedImage', imageData);
        };
        reader.readAsDataURL(file);
        setOpen(false);
    };

    useEffect(() => {
        const savedImage = loadFromLocalStorage('uploadedImage');
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <SidePanel
                    side="left"
                    isOpen={isMobile ? false : leftPanelOpen}
                    togglePanel={() => setLeftPanelOpen(!leftPanelOpen)}
                >
                    <SliderControl />
                    <TreeViewControl />
                </SidePanel>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        transition: 'margin 0.3s',
                        marginLeft: isMobile ? '0' : leftPanelOpen ? '240px' : '0',
                        marginRight: isMobile ? '0' : rightPanelOpen ? '240px' : '0',
                    }}
                >
                    <MainPanel image={image} />
                </Box>
                <SidePanel
                    side="right"
                    isOpen={isMobile ? false : rightPanelOpen}
                    togglePanel={() => setRightPanelOpen(!rightPanelOpen)}
                >
                    <ImportButton onClick={() => setOpen(true)} />
                </SidePanel>
            </Box>
            <ImportDialog open={open} onClose={() => setOpen(false)} onDrop={handleDrop} />
        </Box>
    );
};

const MainLayoutWithProvider: React.FC = () => (
    <ControlPanelProvider>
        <MainLayout />
    </ControlPanelProvider>
);

export default MainLayoutWithProvider;
