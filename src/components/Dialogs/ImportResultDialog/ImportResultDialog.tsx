import React, {useMemo} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SxProps,
    Theme,
    Typography,
    useTheme
} from '@mui/material';
import {useTranslation} from "react-i18next";

interface ImportResultDialogProps {
    open: boolean;
    onClose: () => void;
    success: boolean;
    message: string;
}

const ImportResultDialog: React.FC<ImportResultDialogProps> = ({open, onClose, success, message}) => {
    const theme = useTheme();
    const {t} = useTranslation();

    const paperStyles = useMemo<SxProps<Theme>>(() => ({
        backgroundColor: theme.palette.background.paper,
    }), [theme]);

    const titleStyles = useMemo<SxProps<Theme>>(() => ({
        color: success ? theme.palette.success.main : theme.palette.error.main,
    }), [success, theme]);

    const messageStyles = useMemo<SxProps<Theme>>(() => ({
        color: theme.palette.text.primary,
    }), [theme]);

    const buttonStyles = useMemo<SxProps<Theme>>(() => ({
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }), [theme]);

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{sx: paperStyles}}>
            <DialogTitle sx={titleStyles}>
                {success ? t('import success') : t('import failed')}
            </DialogTitle>
            <DialogContent>
                <Typography sx={messageStyles}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={buttonStyles}>
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ImportResultDialog);
