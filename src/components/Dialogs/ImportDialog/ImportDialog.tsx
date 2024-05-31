import React from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import {useTranslation} from "react-i18next";

interface ImportDialogProps {
    open: boolean;
    onClose: () => void;
    onDrop: (acceptedFiles: File[]) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ open, onClose, onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: theme.palette.background.paper } }}>
            <DialogTitle sx={{ color: theme.palette.text.primary }}>{t('import photo')}</DialogTitle>
            <DialogContent>
                <Box {...getRootProps()} sx={{ border: `2px dashed ${theme.palette.text.secondary}`, padding: 2, textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <Typography sx={{ color: theme.palette.text.primary }}>{t('dialog photo')}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={{
                        color: theme.palette.getContrastText(theme.palette.secondary.main),
                        backgroundColor: theme.palette.secondary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDialog;
