import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, Popper, ClickAwayListener, Grow, Paper, Grid, TextField, CircularProgress, IconButton, MenuItem, Menu, makeStyles } from '@material-ui/core';
import Message from '../services/axios/message';
import * as API from '../services/axios'

const useStyles = makeStyles((theme) => ({
    paper: {
        border: "10px solid transparent",
        zIndex: "10",
        textAlign: 'center',
        width: "250px",
    },
    buttonProgress: {
        position: 'absolute',
        top: '80%',
        left: '45%',
    },
    inputRoot: {
        color: 'inherit',
    },
}));

export default function Login({ checkLogin }) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    const anchorRef = React.useRef(null);
    const [anchorElLogin, setAnchorElLogin] = React.useState(null);
    const [openBtnDD, setOpenBtnDD] = React.useState(false);
    const openLogin = Boolean(anchorElLogin);

    const handleMenuLogin = (event) => {
        setAnchorElLogin(event.currentTarget);
    };

    const handleCloseLogin = () => {
        setAnchorElLogin(null);
    };
    // button dropdown
    const handleToggleBtnDD = () => {
        setOpenBtnDD((prevOpen) => !prevOpen);
    };

    const handleClickAwayBtnDD = () => {
        setOpenBtnDD(false);
    };

    // const onClickLogin = () => {
    //     setIsLogin(true);
    //     // setTimeout(() => {
    //     //     setIsLogin(false);
    //     //     setOpenBtnDD(false);
    //     // }, 5000);
    // }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openBtnDD);
    useEffect(() => {
        if (prevOpen.current === true && openBtnDD === false) {
            anchorRef.current.focus();
        }

        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            setIsLogin(true);
        }

        prevOpen.current = openBtnDD;
    }, [openBtnDD]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let dataBody = {
            username: username,
            password: password
        }
        login(dataBody);
    }

    const login = async (values) => {
        try {
            const apiUrl = API.DOMAIN + '/api/user/login';
            const response = await axios.post(apiUrl, values);
            // console.log(response.data);
            if (Message.CODE_MESSAGE.S01 === response.data.message.code) {
                setIsLogin(true);
                localStorage.setItem('token', JSON.stringify(response.data));
                checkLogin();
            }
            alert(response.data.message.text);
        } catch (error) {
            alert(error);
            setIsLogin(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token'); localStorage.removeItem('profile');
        setIsLogin(false);
        handleCloseLogin();
        setOpenBtnDD(false);
        window.location.reload();
    }

    return (
        <>
            {
                !isLogin ? (
                    <>
                        <Button
                            ref={anchorRef}
                            aria-controls={openBtnDD ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggleBtnDD}
                            className={classes.inputRoot}
                        >Login</Button>
                        <Popper open={openBtnDD} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <ClickAwayListener onClickAway={handleClickAwayBtnDD}>
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <form onSubmit={handleSubmit} >
                                            <Paper className={classes.paper}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            id="outlined-required"
                                                            name="username"
                                                            label="Username"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={username}
                                                            onInput={e => setUsername(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            id="outlined-password-input"
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            autoComplete="current-password"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={password}
                                                            onInput={e => setPassword(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            fullWidth
                                                            // onClick={onClickLogin}
                                                            disabled={isLogin}>Login</Button>
                                                        {isLogin && <CircularProgress size={30} className={classes.buttonProgress} />}
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </form>
                                    </Grow>
                                </ClickAwayListener>
                            )}
                        </Popper>
                    </>
                ) : (
                        <div>
                            <Button disabled style={{ color: 'white', paddingRight: '0px' }}>23Aloha</Button>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuLogin}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElLogin}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openLogin}
                                onClose={handleCloseLogin}
                            >
                                <MenuItem onClick={handleCloseLogin}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )
            }
        </>
    )
}