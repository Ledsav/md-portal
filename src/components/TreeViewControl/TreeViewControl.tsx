import React from 'react';
import { Box, Typography } from '@mui/material';
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view';
import {useControlPanelContext} from "../../context/ControlPanelContext";


const TreeViewControl: React.FC = () => {
    const { expanded, setExpanded } = useControlPanelContext();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mt: 2 }}>Tree View</Typography>
            <SimpleTreeView
                expandedItems={expanded}
                onExpandedItemsChange={handleToggle}
            >
                <TreeItem itemId="1" label="Applications">
                    <TreeItem itemId="2" label="Calendar" />
                    <TreeItem itemId="3" label="Chrome" />
                    <TreeItem itemId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem itemId="5" label="Documents">
                    <TreeItem itemId="6" label="Material-UI">
                        <TreeItem itemId="7" label="src">
                            <TreeItem itemId="8" label="index.js" />
                            <TreeItem itemId="9" label="tree-view.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </SimpleTreeView>
        </Box>
    );
};

export default TreeViewControl;
