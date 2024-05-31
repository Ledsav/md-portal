import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import MainPanel from '../components/MainPanel/MainPanel';
import SidePanel from '../components/SidePanel/SidePanel';
import SliderControl from '../components/SliderControl/SliderControl';
import TreeViewControl from '../components/TreeViewControl/TreeViewControl';
import ImportDialog from '../components/ImportDialog/ImportDialog';
import ImportButton from '../components/Buttons/ImportButton/ImportButton';
import { ControlPanelProvider } from '../context/ControlPanelContext';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtil';

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(loadFromLocalStorage('uploadedImage'));
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);

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
        <ControlPanelProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <TopBar />
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <SidePanel side="left" isOpen={leftPanelOpen} togglePanel={() => setLeftPanelOpen(!leftPanelOpen)}>
                        <SliderControl />
                        <TreeViewControl />
                    </SidePanel>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            transition: 'margin 0.3s',
                            marginLeft: leftPanelOpen ? '240px' : '0',
                            marginRight: rightPanelOpen ? '240px' : '0',
                        }}
                    >
                        <MainPanel image={image} />
                    </Box>
                    <SidePanel side="right" isOpen={rightPanelOpen} togglePanel={() => setRightPanelOpen(!rightPanelOpen)}>
                        <ImportButton onClick={() => setOpen(true)} />
                    </SidePanel>
                </Box>
                <ImportDialog open={open} onClose={() => setOpen(false)} onDrop={handleDrop} />
            </Box>
        </ControlPanelProvider>
    );
};

export default MainLayout;
