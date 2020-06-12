import React from 'react';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '6px 4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default ({ message, onTypingMessage, onSubmit }) => {
  const classes = useStyles();

    return (
        <Paper component="form" onSubmit={ onSubmit } className={ classes.root }>
            <IconButton className={ classes.iconButton } aria-label="select macro">
                <MenuIcon />
            </IconButton>
            <Divider className={ classes.divider } orientation="vertical" />
            <IconButton className={ classes.iconButton } aria-label="attach file">
                <AttachFileIcon />
            </IconButton>
            <InputBase
                className={ classes.input }
                value={ message }
                onChange={ onTypingMessage }
                placeholder="Write your message!"
                inputProps={{ 'aria-label': 'write your message' }}
            />
            <IconButton type="submit" className={ classes.iconButton } aria-label="send message">
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
