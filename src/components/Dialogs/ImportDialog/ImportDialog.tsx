import React from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface ImportDialogProps {
    open: boolean;
    onClose: () => void;
    onDrop: (acceptedFiles: File[]) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ open, onClose, onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Import Photo</DialogTitle>
            <DialogContent>
                <Box {...getRootProps()} sx={{ border: '2px dashed grey', padding: 2, textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <Typography>Drag and drop a photo here, or click to select one</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDialog;
