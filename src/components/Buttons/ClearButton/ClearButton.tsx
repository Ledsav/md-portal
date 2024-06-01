import React from 'react';
import { Button, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={<ClearIcon />}
            sx={{
                color: theme.palette.getContrastText(theme.palette.primary.main),
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            }}
        >
            {t('Clear')}
        </Button>
    );
};

export default ClearButton;
