import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, useTheme } from '@mui/material';
import {useTranslation} from "react-i18next";

interface ImportResultDialogProps {
    open: boolean;
    onClose: () => void;
    success: boolean;
    message: string;
}

const ImportResultDialog: React.FC<ImportResultDialogProps> = ({ open, onClose, success, message }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { backgroundColor: theme.palette.background.paper } }}>
            <DialogTitle sx={{ color: success ? theme.palette.success.main : theme.palette.error.main }}>
                {success ? t('import success') : t('import failed') }
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ color: theme.palette.text.primary }}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={{
                        color: theme.palette.getContrastText(theme.palette.primary.main),
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportResultDialog;
