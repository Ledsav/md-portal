import React, {useMemo} from 'react';
import {Box, Button, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface ImportButtonProps {
    onClick?: () => void;
}

const ImportButton: React.FC<ImportButtonProps> =
    ({
         onClick = () => {
         }
     }) => {
        const theme = useTheme();
        const {t} = useTranslation();

        const buttonStyles = useMemo(() => ({
            color: theme.palette.getContrastText(theme.palette.primary.main),
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        }), [theme]);

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
                    sx={buttonStyles}
                >
                    {t('import photo')}
                </Button>
            </Box>
        );
    };

export default React.memo(ImportButton);
