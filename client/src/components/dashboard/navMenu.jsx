import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({ user }) {
    const classes = useStyles();
    const style = {
        color: 'white',
        textTransform: 'uppercase',
    };

    return (
        <div >
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className="mr-4" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        OnCall.lk
                    </Typography>

                    {!user && (<React.Fragment>
                        <Button href="/services" color="inherit">Services</Button>
                        <Button href="/providers" color="inherit">Providers</Button>
                        <Button href="/login" color="inherit">Login</Button>
                        <Button href="/register" color="inherit">Register</Button>

                    </React.Fragment>)}
                    {user && (user.isProvider == true) && (
                        <React.Fragment>
                            <Button href="/services" color="inherit">Services</Button>
                            <Button href="/providers" color="inherit">Providers</Button>
                            <Button href="/my-service" color="inherit">My Services</Button>
                            <Button href="/orders" color="inherit">Orders</Button>
                            <Button href="/profile" color="inherit">Profile</Button>
                            <Button href="/logout" color="inherit">Logout</Button>
                        </React.Fragment>
                    )}
                    {user && (user.isProvider == false) && (
                        <React.Fragment>
                            <Button href="/services" color="inherit">Services</Button>
                            <Button href="/providers" color="inherit">Providers</Button>
                            <Button href="/user/my-orders" color="inherit">My Orders</Button>
                            <Button href="/logout" color="inherit">Logout</Button>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
