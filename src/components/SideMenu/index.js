import React from 'react';
import {
    Drawer, 
    Divider, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default () => {
    const classes = useStyles();
    
    return (
        <Drawer
            className={ classes.drawer }
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
        >
            <div className={ classes.toolbar } />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={ text }>
                        <ListItemIcon>
                            { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
                        </ListItemIcon>
                        <ListItemText primary={ text } />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={ text }>
                        <ListItemIcon>
                            { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
                        </ListItemIcon>
                        <ListItemText primary={ text } />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
