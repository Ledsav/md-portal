import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ImportResultDialogProps {
    open: boolean;
    onClose: () => void;
    success: boolean;
}

const ImportResultDialog: React.FC<ImportResultDialogProps> = ({ open, onClose, success }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{success ? 'Import Successful' : 'Import Failed'}</DialogTitle>
            <DialogContent>
                <Typography>{success ? 'The image was imported successfully.' : 'There was an error importing the image.'}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportResultDialog;
