// utils/indexedDBUtil.ts

import { openDB } from 'idb';

const DB_NAME = 'AppDB';
const STORE_NAME = 'images';

export const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
    });
    return db;
};

export const saveImageToIndexedDB = async (image: string) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.add({ image });
    await tx.done;
};

export const loadImagesFromIndexedDB = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const images = await tx.store.getAll();
    await tx.done;
    return images.map(record => ({ id: record.id, image: record.image }));
};

export const deleteImageFromIndexedDB = async (id: number) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.delete(id);
    await tx.done;
};

export const clearIndexedDB = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.clear();
    await tx.done;
};
