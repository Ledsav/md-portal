import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useTranslation } from 'react-i18next';
import { useControlPanelContext } from '../../context/ControlPanelContext';

const TreeViewControl: React.FC = () => {
    const { expanded, setExpanded } = useControlPanelContext();
    const theme = useTheme();
    const { t } = useTranslation();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, mt: 2 }}>
                {t('Tree View')}
            </Typography>
            <SimpleTreeView
                expandedItems={expanded}
                onExpandedItemsChange={handleToggle}
                sx={{
                    '& .MuiTreeItem-root': {
                        '&:hover > .MuiTreeItem-content': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        '&.Mui-selected > .MuiTreeItem-content': {
                            backgroundColor: theme.palette.action.selected,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        },
                    },
                }}
            >
                <TreeItem itemId="1" label={t('Level 1')}>
                    <TreeItem itemId="2" label={t('Level 1.1')}>
                        <TreeItem itemId="3" label={t('Level 1.1.1')} />
                        <TreeItem itemId="4" label={t('Level 1.2.1')} />
                    </TreeItem>
                    <TreeItem itemId="5" label={t('Level 1.2')}>
                        <TreeItem itemId="6" label={t('Level 1.2.1')} />
                        <TreeItem itemId="7" label={t('Level 1.2.2')} />
                    </TreeItem>
                </TreeItem>
                <TreeItem itemId="8" label={t('Level 2')}>
                    <TreeItem itemId="9" label={t('Level 2.1')} />
                </TreeItem>
            </SimpleTreeView>
        </Box>
    );
};

export default TreeViewControl;
