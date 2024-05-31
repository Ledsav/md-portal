// src/components/Buttons/ImportButton.tsx
import React from 'react';
import { Button, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ImportButtonProps {
    onClick: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onClick }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2
            }}
        >
            <Button
                variant="contained"
                onClick={onClick}
                sx={{
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                {t('import photo')}
            </Button>
        </Box>
    );
};

export default ImportButton;
