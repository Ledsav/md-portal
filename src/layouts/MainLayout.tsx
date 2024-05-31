import React, { useState } from 'react';
import { Box } from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import MainPanel from '../components/MainPanel/MainPanel';
import SidePanel from '../components/SidePanel/SidePanel';
import SliderControl from '../components/SliderControl/SliderControl';
import TreeViewControl from '../components/TreeViewControl/TreeViewControl';
import ImportDialog from '../components/ImportDialog/ImportDialog';
import ImportButton from '../components/Buttons/ImportButton/ImportButton';
import { ControlPanelProvider } from '../context/ControlPanelContext';

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const handleDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setOpen(false);
    };

    return (
        <ControlPanelProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <TopBar />
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <SidePanel side="left">
                        <SliderControl />
                        <TreeViewControl />
                    </SidePanel>
                    <MainPanel image={image} />
                    <SidePanel side="right">
                        <ImportButton onClick={() => setOpen(true)} />
                    </SidePanel>
                </Box>
                <ImportDialog open={open} onClose={() => setOpen(false)} onDrop={handleDrop} />
            </Box>
        </ControlPanelProvider>
    );
};

export default MainLayout;
