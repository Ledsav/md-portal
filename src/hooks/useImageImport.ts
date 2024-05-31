import { useState, useEffect, useCallback } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtil';
import { useControlPanelContext } from '../context/ControlPanelContext';

const useImageImport = () => {
    const { addImage } = useControlPanelContext();
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [importSuccess, setImportSuccess] = useState(false);
    const [importMessage, setImportMessage] = useState('');
    const [image, setImage] = useState<string | null>(loadFromLocalStorage('uploadedImage'));

    const handleImageImport = useCallback((file: File) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!validImageTypes.includes(file.type)) {
            setImportMessage('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            setImportSuccess(false);
            setResultDialogOpen(true);
            return;
        }

        if (file.size > maxSize) {
            setImportMessage('File size exceeds the limit of 5 MB.');
            setImportSuccess(false);
            setResultDialogOpen(true);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result as string;
            setImage(imageData);
            saveToLocalStorage('uploadedImage', imageData);
            addImage(imageData);
            setImportMessage('Image imported successfully.');
            setImportSuccess(true);
            setResultDialogOpen(true);
        };
        reader.onerror = () => {
            setImportMessage('Error reading the file.');
            setImportSuccess(false);
            setResultDialogOpen(true);
        };
        reader.readAsDataURL(file);
    }, [addImage]);

    useEffect(() => {
        const savedImage = loadFromLocalStorage('uploadedImage');
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    return { image, handleImageImport, resultDialogOpen, setResultDialogOpen, importSuccess, importMessage };
};

export default useImageImport;
