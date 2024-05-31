// ControlPanelContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {clearIndexedDB, loadImagesFromIndexedDB, saveImageToIndexedDB} from "../utils/indexedDBUtil";

interface ControlPanelContextType {
    sliderValue: number;
    setSliderValue: (value: number) => void;
    expanded: string[];
    setExpanded: (nodeIds: string[]) => void;
    leftPanelOpen: boolean;
    setLeftPanelOpen: (isOpen: boolean) => void;
    rightPanelOpen: boolean;
    setRightPanelOpen: (isOpen: boolean) => void;
    images: string[];
    addImage: (image: string) => void;
    removeImage: (index: number) => void;
    setImages: (images: string[]) => void;
    resetData: () => void;
}

const ControlPanelContext = createContext<ControlPanelContextType | undefined>(undefined);

interface ControlPanelProviderProps {
    children: ReactNode;
}

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({ children }) => {
    const [sliderValue, setSliderValue] = useState<number>(30);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [leftPanelOpen, setLeftPanelOpen] = useState<boolean>(false);
    const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);
    const [images, setImagesState] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = await loadImagesFromIndexedDB();
            setImagesState(loadedImages);
        };
        loadImages();
    }, []);

    const addImage = async (image: string) => {
        await saveImageToIndexedDB(image);
        setImagesState([...images, image]);
    };

    const removeImage = (index: number) => {
        setImagesState(images.filter((_, i) => i !== index));
    };

    const setImages = (newImages: string[]) => {
        setImagesState(newImages);
    };

    const resetData = async () => {
        setSliderValue(30);
        setExpanded([]);
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setImagesState([]);
        await clearIndexedDB();
    };

    return (
        <ControlPanelContext.Provider value={{
            sliderValue,
            setSliderValue,
            expanded,
            setExpanded,
            leftPanelOpen,
            setLeftPanelOpen,
            rightPanelOpen,
            setRightPanelOpen,
            images,
            addImage,
            removeImage,
            setImages,
            resetData // Added this line
        }}>
            {children}
        </ControlPanelContext.Provider>
    );
};

export const useControlPanelContext = () => {
    const context = useContext(ControlPanelContext);
    if (context === undefined) {
        throw new Error('useControlPanelContext must be used within a ControlPanelProvider');
    }
    return context;
};
