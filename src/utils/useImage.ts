import { useState, useEffect } from 'react';

const useImage = (url: string): [HTMLImageElement | null, boolean] => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImage(img);
            setIsLoaded(true);
        };
    }, [url]);

    return [image, isLoaded];
};

export default useImage;
