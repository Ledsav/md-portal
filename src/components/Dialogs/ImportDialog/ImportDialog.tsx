import React, {useMemo} from 'react';
import {
    Box,
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
import {DropzoneInputProps, DropzoneRootProps, useDropzone} from 'react-dropzone';
import {useTranslation} from "react-i18next";

interface ImportDialogProps {
    open: boolean;
    onClose: () => void;
    onDrop: (acceptedFiles: File[]) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({open, onClose, onDrop}) => {
    const {getRootProps, getInputProps}: { getRootProps: () => DropzoneRootProps; getInputProps: () => DropzoneInputProps } = useDropzone({onDrop});
    const theme = useTheme();
    const {t} = useTranslation();

    const dialogStyles = useMemo(() => ({
        backgroundColor: theme.palette.background.paper,
    }), [theme]);

    const boxStyles = useMemo<SxProps<Theme>>(() => ({
        border: `2px dashed ${theme.palette.text.secondary}`,
        padding: 2,
        textAlign: 'center',
    }), [theme]);

    const buttonStyles = useMemo<SxProps<Theme>>(() => ({
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    }), [theme]);

    const titleStyles = useMemo<SxProps<Theme>>(() => ({
        color: theme.palette.text.primary,
    }), [theme]);

    const typographyStyles = useMemo<SxProps<Theme>>(() => ({
        color: theme.palette.text.primary,
    }), [theme]);

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{sx: dialogStyles}}>
            <DialogTitle sx={titleStyles}>{t('import photo')}</DialogTitle>
            <DialogContent>
                <Box {...getRootProps()} sx={boxStyles}>
                    <input {...getInputProps()} />
                    <Typography sx={typographyStyles}>{t('dialog photo')}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={buttonStyles}>
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ImportDialog);
