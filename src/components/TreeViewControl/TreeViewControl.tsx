import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useControlPanelContext } from '../../context/ControlPanelContext';

const TreeViewControl: React.FC = () => {
    const { expanded, setExpanded } = useControlPanelContext();
    const theme = useTheme();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, mt: 2 }}>
                Tree View
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
                <TreeItem itemId="1" label="Projects">
                    <TreeItem itemId="2" label="Project A">
                        <TreeItem itemId="3" label="src">
                            <TreeItem itemId="4" label="index.js" />
                            <TreeItem itemId="5" label="App.js" />
                        </TreeItem>
                        <TreeItem itemId="6" label="public">
                            <TreeItem itemId="7" label="index.html" />
                        </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="8" label="Project B">
                        <TreeItem itemId="9" label="src">
                            <TreeItem itemId="10" label="main.js" />
                            <TreeItem itemId="11" label="style.css" />
                        </TreeItem>
                        <TreeItem itemId="12" label="dist">
                            <TreeItem itemId="13" label="bundle.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
                <TreeItem itemId="14" label="Personal">
                    <TreeItem itemId="15" label="Photos">
                        <TreeItem itemId="16" label="Vacation">
                            <TreeItem itemId="17" label="photo1.jpg" />
                            <TreeItem itemId="18" label="photo2.jpg" />
                        </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="19" label="Music">
                        <TreeItem itemId="20" label="Rock">
                            <TreeItem itemId="21" label="song1.mp3" />
                            <TreeItem itemId="22" label="song2.mp3" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </SimpleTreeView>
        </Box>
    );
};

export default TreeViewControl;
