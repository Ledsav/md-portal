import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ImportResultDialogProps {
    open: boolean;
    onClose: () => void;
    success: boolean;
    message: string;
}

const ImportResultDialog: React.FC<ImportResultDialogProps> = ({ open, onClose, success, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{success ? 'Import Successful' : 'Import Failed'}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportResultDialog;
