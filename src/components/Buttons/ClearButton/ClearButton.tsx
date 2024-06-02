import React, {useMemo} from 'react';
import {Button, useTheme} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useTranslation} from 'react-i18next';

interface ClearButtonProps {
    onClick?: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({
                                                     onClick = () => {
                                                     }
                                                 }) => {
    const theme = useTheme();
    const {t} = useTranslation();

    // Use useMemo to memoize the styles for better performance
    const buttonStyles = useMemo(() => ({
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }), [theme]);

    return (
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={<ClearIcon/>}
            sx={buttonStyles}
        >
            {t('Clear')}
        </Button>
    );
};

export default React.memo(ClearButton);
