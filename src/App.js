import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, CssBaseline } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';

import SideMenu from './components/SideMenu';
import Chat from './components/Chat';

import './App.css';

const socket = io('http://localhost:3001', {
    path: '/chat',
    transports: ['polling'],
    transportOptions: {
        polling: {
            extraHeaders: { 
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDcxNWVlZDNhZjFhMDY0ODVkN2ZiZiIsImlhdCI6MTU5MTE1NDMzNywiZXhwIjoxNTkxMjQwNzM3fQ.Um0lYQuWVhbAIrccRcbWNLO1_eX-6aMym_YaJeG7OHc', 
            },
        },
    },
});

//socket.connect();










const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        position: 'relative',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: '100vh',
    },
    messages: {
        height: 'calc(100% - 120px)',
        backgroundColor: '#DDDF',
        padding: theme.spacing(2),
    },
}));

export default () => {
    const classes = useStyles();

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     socket.emit('authentication', { username: "John", password: "secret" });
    // }, []);

    useEffect(() => {
        socket.on('message', data => {
            console.log(data);

            socket.emit('auth', { auth: 'abc' });
        });

        // socket.on('previousMessages', messages => setMessages(messages));

        // socket.on('receivedMessage', message => setMessages([...messages, message]));

        console.log('ok');
    }, [messages]);

    function sendMessage(event) {
        event.preventDefault();

        if (user.length && message.length) {
            var newMessage = { user, text: message };

            setMessage('');

            setMessages([...messages, newMessage]);

            socket.emit('sendMessage', newMessage);
        }
    }
    
    return (
        <div className={ classes.root }>
            <CssBaseline />
            <AppBar position="fixed" className={ classes.appBar }>
                <Toolbar>
                    <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={ classes.title }>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <SideMenu />
            <main className={ classes.content }>
                <div className={ classes.toolbar } />
                <div className={ classes.messages }>
                    { messages.map((message, index) => 
                        <p key={ index }>
                            <strong>{ message.text }:</strong> { message.text }
                        </p>
                    )}
                </div>
                <Chat 
                    message={ message }
                    onTypingMessage={ event => {
                        setUser(event.target.value);
                        setMessage(event.target.value);
                    }} 
                    onSubmit={ sendMessage }
                />
            </main>
        </div>
    );
};
