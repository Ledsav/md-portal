import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clearIndexedDB, loadImagesFromIndexedDB, saveImageToIndexedDB, deleteImageFromIndexedDB } from "../utils/indexedDBUtil";
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtil';

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
    selectedTool: string | null;
    setSelectedTool: (tool: string | null) => void;
    contrastValue: number;
    setContrastValue: (value: number) => void;
    canvasLines: { points: number[], erased: boolean }[];
    setCanvasLines: React.Dispatch<React.SetStateAction<{ points: number[], erased: boolean }[]>>;
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
    selectedTool: 'selectedTool',
    contrastValue: 'contrastValue',
    canvasLines: 'canvasLines',
};

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({ children }) => {
    const [sliderValue, setSliderValueState] = useState<number>(30);
    const [expanded, setExpandedState] = useState<string[]>([]);
    const [leftPanelOpen, setLeftPanelOpenState] = useState<boolean>(false);
    const [rightPanelOpen, setRightPanelOpenState] = useState<boolean>(false);
    const [images, setImagesState] = useState<{ id: number, image: string }[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedTool, setSelectedToolState] = useState<string | null>('segment');
    const [contrastValue, setContrastValueState] = useState<number>(1);
    const [canvasLines, setCanvasLinesState] = useState<{ points: number[], erased: boolean }[]>([]);

    useEffect(() => {
        const loadState = async () => {
            const loadedImages = await loadImagesFromIndexedDB();
            setImagesState(loadedImages);

            const savedSliderValue = loadFromLocalStorage(STORAGE_KEYS.sliderValue);
            const savedExpanded = loadFromLocalStorage(STORAGE_KEYS.expanded);
            const savedLeftPanelOpen = loadFromLocalStorage(STORAGE_KEYS.leftPanelOpen);
            const savedRightPanelOpen = loadFromLocalStorage(STORAGE_KEYS.rightPanelOpen);
            const savedSelectedImageIndex = loadFromLocalStorage(STORAGE_KEYS.selectedImageIndex);
            const savedSelectedTool = loadFromLocalStorage(STORAGE_KEYS.selectedTool);
            const savedContrastValue = loadFromLocalStorage(STORAGE_KEYS.contrastValue);
            const savedCanvasLines = loadFromLocalStorage(STORAGE_KEYS.canvasLines);

            if (savedSliderValue !== null) setSliderValueState(savedSliderValue);
            if (savedExpanded !== null) setExpandedState(savedExpanded);
            if (savedLeftPanelOpen !== null) setLeftPanelOpenState(savedLeftPanelOpen);
            if (savedRightPanelOpen !== null) setRightPanelOpenState(savedRightPanelOpen);
            if (savedSelectedImageIndex !== null) setSelectedImageIndex(savedSelectedImageIndex);
            if (savedSelectedTool !== null) setSelectedToolState(savedSelectedTool);
            if (savedContrastValue !== null) setContrastValueState(savedContrastValue);
            if (savedCanvasLines !== null) setCanvasLinesState(savedCanvasLines);
        };

        loadState();
    }, []);

    const setSliderValue = (value: number) => {
        setSliderValueState(value);
        saveToLocalStorage(STORAGE_KEYS.sliderValue, value);
    };

    const setExpanded = (nodeIds: string[]) => {
        setExpandedState(nodeIds);
        saveToLocalStorage(STORAGE_KEYS.expanded, nodeIds);
    };

    const setLeftPanelOpen = (isOpen: boolean) => {
        setLeftPanelOpenState(isOpen);
        saveToLocalStorage(STORAGE_KEYS.leftPanelOpen, isOpen);
    };

    const setRightPanelOpen = (isOpen: boolean) => {
        setRightPanelOpenState(isOpen);
        saveToLocalStorage(STORAGE_KEYS.rightPanelOpen, isOpen);
    };

    const addImage = async (image: string) => {
        await saveImageToIndexedDB(image);
        const loadedImages = await loadImagesFromIndexedDB();
        setImagesState(loadedImages);
    };

    const removeImage = async (id: number) => {
        await deleteImageFromIndexedDB(id);
        const remainingImages = images.filter(image => image.id !== id);
        setImagesState(remainingImages);
    };

    const setImages = (newImages: { id: number, image: string }[]) => {
        setImagesState(newImages);
    };

    const resetData = async () => {
        setSliderValue(30);
        setExpanded([]);
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setImagesState([]);
        setSelectedImageIndex(0);
        setSelectedToolState('segment');
        setContrastValueState(1);
        setCanvasLinesState([]);
        await clearIndexedDB();
        localStorage.clear();
    };

    const selectImage = (index: number) => {
        setSelectedImageIndex(index);
        saveToLocalStorage(STORAGE_KEYS.selectedImageIndex, index);
    };

    const setSelectedTool = (tool: string | null) => {
        setSelectedToolState(tool);
        saveToLocalStorage(STORAGE_KEYS.selectedTool, tool);
    };

    const setContrastValue = (value: number) => {
        setContrastValueState(value);
        saveToLocalStorage(STORAGE_KEYS.contrastValue, value);
    };

    const setCanvasLines = (lines: { points: number[], erased: boolean }[] | ((prevState: { points: number[], erased: boolean }[]) => { points: number[], erased: boolean }[])) => {
        setCanvasLinesState(lines);
        saveToLocalStorage(STORAGE_KEYS.canvasLines, lines);
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
            resetData,
            selectedImageIndex,
            selectImage,
            selectedTool,
            setSelectedTool,
            contrastValue,
            setContrastValue,
            canvasLines,
            setCanvasLines,
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
