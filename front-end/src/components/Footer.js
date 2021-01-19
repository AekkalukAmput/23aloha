import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    styles: {
        textAlign: 'center',
        position: 'relative',
        bottom: '0',
        width: '100% !important',
        height: '75px !important ',
        color: '#fff',
        backgroundColor: '#3f51b5',
        boxShadow: '0px -5px 16px -6px rgba(0,0,0,0.75)'
    }
}))
const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <footer className={classes.styles}>
                <p>© Company 2020</p>
            </footer>
        </>
    )
}

export default Footer;