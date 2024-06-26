import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {
    clearIndexedDB,
    deleteImageFromIndexedDB,
    loadImagesFromIndexedDB,
    saveImageToIndexedDB
} from "../utils/indexedDBUtil";
import {loadFromLocalStorage, saveToLocalStorage} from '../utils/localStorageUtil';

interface ControlPanelContextType {
    sliderValue: number;
    setSliderValue: (value: number) => void;
    expanded: string[];
    setExpanded: (nodeIds: string[]) => void;
    leftPanelOpen: boolean;
    setLeftPanelOpen: (isOpen: boolean) => void;
    rightPanelOpen: boolean;
    setRightPanelOpen: (isOpen: boolean) => void;
    images: { id: number, image: string }[];
    addImage: (image: string) => void;
    removeImage: (id: number) => void;
    setImages: (images: { id: number, image: string }[]) => void;
    resetData: () => void;
    selectedImageIndex: number;
    selectImage: (index: number) => void;
}

const ControlPanelContext = createContext<ControlPanelContextType | undefined>(undefined);

interface ControlPanelProviderProps {
    children: ReactNode;
}

const STORAGE_KEYS = {
    sliderValue: 'sliderValue',
    expanded: 'expanded',
    leftPanelOpen: 'leftPanelOpen',
    rightPanelOpen: 'rightPanelOpen',
    selectedImageIndex: 'selectedImageIndex',
};

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({children}) => {
    const [sliderValue, setSliderValueState] = useState<number>(30);
    const [expanded, setExpandedState] = useState<string[]>([]);
    const [leftPanelOpen, setLeftPanelOpenState] = useState<boolean>(false);
    const [rightPanelOpen, setRightPanelOpenState] = useState<boolean>(false);
    const [images, setImagesState] = useState<{ id: number, image: string }[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    useEffect(() => {
        const loadState = async () => {
            const loadedImages = await loadImagesFromIndexedDB();
            setImagesState(loadedImages);

            const savedSliderValue = loadFromLocalStorage(STORAGE_KEYS.sliderValue);
            const savedExpanded = loadFromLocalStorage(STORAGE_KEYS.expanded);
            const savedLeftPanelOpen = loadFromLocalStorage(STORAGE_KEYS.leftPanelOpen);
            const savedRightPanelOpen = loadFromLocalStorage(STORAGE_KEYS.rightPanelOpen);
            const savedSelectedImageIndex = loadFromLocalStorage(STORAGE_KEYS.selectedImageIndex);

            if (savedSliderValue !== null) setSliderValueState(savedSliderValue);
            if (savedExpanded !== null) setExpandedState(savedExpanded);
            if (savedLeftPanelOpen !== null) setLeftPanelOpenState(savedLeftPanelOpen);
            if (savedRightPanelOpen !== null) setRightPanelOpenState(savedRightPanelOpen);
            if (savedSelectedImageIndex !== null) setSelectedImageIndex(savedSelectedImageIndex);
        };

        loadState();
    }, []);

    const setSliderValue = useCallback((value: number) => {
        setSliderValueState(value);
        saveToLocalStorage(STORAGE_KEYS.sliderValue, value);
    }, []);

    const setExpanded = useCallback((nodeIds: string[]) => {
        setExpandedState(nodeIds);
        saveToLocalStorage(STORAGE_KEYS.expanded, nodeIds);
    }, []);

    const setLeftPanelOpen = useCallback((isOpen: boolean) => {
        setLeftPanelOpenState(isOpen);
        saveToLocalStorage(STORAGE_KEYS.leftPanelOpen, isOpen);
    }, []);

    const setRightPanelOpen = useCallback((isOpen: boolean) => {
        setRightPanelOpenState(isOpen);
        saveToLocalStorage(STORAGE_KEYS.rightPanelOpen, isOpen);
    }, []);

    const addImage = useCallback(async (image: string) => {
        await saveImageToIndexedDB(image);
        const loadedImages = await loadImagesFromIndexedDB();
        setImagesState(loadedImages);
    }, []);

    const removeImage = useCallback(async (id: number) => {
        await deleteImageFromIndexedDB(id);
        setImagesState(prevImages => prevImages.filter(image => image.id !== id));
    }, []);

    const setImages = useCallback((newImages: { id: number, image: string }[]) => {
        setImagesState(newImages);
    }, []);

    const resetData = useCallback(async () => {
        setSliderValueState(30);
        setExpandedState([]);
        setLeftPanelOpenState(false);
        setRightPanelOpenState(false);
        setImagesState([]);
        setSelectedImageIndex(0);
        await clearIndexedDB();
        localStorage.clear();
    }, []);

    const selectImage = useCallback((index: number) => {
        setSelectedImageIndex(index);
        saveToLocalStorage(STORAGE_KEYS.selectedImageIndex, index);
    }, []);

    const contextValue = useMemo(() => ({
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
        resetData,
        selectedImageIndex,
        selectImage,
    }), [
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
        resetData,
        selectedImageIndex,
        selectImage,
    ]);

    return (
        <ControlPanelContext.Provider value={contextValue}>
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
