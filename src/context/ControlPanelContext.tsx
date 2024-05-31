import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtil';

interface ControlPanelContextType {
    sliderValue: number;
    setSliderValue: (value: number) => void;
    expanded: string[];
    setExpanded: (nodeIds: string[]) => void;
}

const ControlPanelContext = createContext<ControlPanelContextType | undefined>(undefined);

interface ControlPanelProviderProps {
    children: ReactNode;
}

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({ children }) => {
    const [sliderValue, setSliderValue] = useState<number>(loadFromLocalStorage('sliderValue') || 30);
    const [expanded, setExpanded] = useState<string[]>(loadFromLocalStorage('expandedNodes') || []);

    useEffect(() => {
        saveToLocalStorage('sliderValue', sliderValue);
    }, [sliderValue]);

    useEffect(() => {
        saveToLocalStorage('expandedNodes', expanded);
    }, [expanded]);

    return (
        <ControlPanelContext.Provider value={{ sliderValue, setSliderValue, expanded, setExpanded }}>
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
