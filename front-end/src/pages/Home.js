import { Grid, IconButton } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { Route, Redirect } from "react-router-dom";

import * as API from '../services/axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        root2: {
            maxWidth: 345,
            margin: theme.spacing(1),
        },
        card: {
            padding: theme.spacing(2),
        },
        media: {
            height: 140,
        },
        paginator: {
            justifyContent: "center",
            padding: "10px"
        },
        loading: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "100vh",
        }
    }),
);

const Home = () => {
    const [items, setItems] = useState({ 1: [], 2: [], 3: [] });
    const results = useSelector(state => state.fetchAPI, shallowEqual);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 3;
    const [page, setPage] = useState(1);
    const [noOfPages1, setNoOfPages1] = useState(1);
    //dialog
    const [open, setOpen] = useState(false);
    const [dataModal, setDataModal] = useState({ title: "", content: "" });
    //update
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})

    const handleClickOpen = (data) => {
        setOpen(true);
        setDataModal({
            title: data.img_name,
            content: data.img_name
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        searchItems();
    }, [results]);

    let searchItems = debounce(1000, () => {
        setItems(results);
        setNoOfPages1(Math.ceil(results['1'].length / itemsPerPage));
        setLoading(false);
    })

    const handleChange = (event, value) => {
        setPage(value);
    };

    const onClickUpdate = (data) => {
        setDataUpdate(data);
        setIsUpdate(true);
    }

    if (loading) {
        return (
            <Grid container className={classes.loading}>
                <Grid item xs={12}>
                    <CircularProgress size={70} />
                </Grid>
            </Grid>
        )
    }

    if (isUpdate) {
        return (
            <Redirect
                to={{
                    pathname: "/manage",
                    state: { data: dataUpdate }
                }}
            />
        )
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container className={classes.card}>
                    {
                        items['1'].slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
                            return (
                                <Card className={classes.root2} key={item.id}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={"/images/" + item.file_name}
                                            title={item.img_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">{(page - 1) * itemsPerPage + (index + 1)}. {item.img_name}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">ID: {item.id}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => { onClickUpdate(item) }}
                                        >
                                            แก้ไข
                                        </Button>
                                        <Button variant="outlined" color="primary" onClick={() => { handleClickOpen(item) }}>เพิ่มเติม</Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{dataModal.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">{dataModal.content}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Disagree</Button>
                            <Button onClick={handleClose} color="primary" autoFocus>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Divider />
                <Box component="span">
                    <Pagination
                        count={noOfPages1}
                        page={page}
                        onChange={handleChange}
                        defaultPage={1}
                        color="primary"
                        size="large"
                        // showFirstButton
                        // showLastButton
                        classes={{ ul: classes.paginator }}
                    />
                </Box>
                <Divider />
                <Grid container className={classes.card}>
                    {
                        items['2'].map((item) => {
                            return (
                                <Card className={classes.root2} key={item.id}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={"/images/" + item.file_name}
                                            title={item.img_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">ID: {item.id}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">{item.img_name}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">Share</Button>
                                        <Button size="small" color="primary">Learn More</Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                </Grid>
                <Divider />
                <Grid container className={classes.card}>
                    {
                        items['3'].map((item) => {
                            return (
                                <Card className={classes.root2} key={item.id}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={"/images/" + item.file_name}
                                            title={item.img_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">ID: {item.id}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">{item.img_name}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">Share</Button>
                                        <Button size="small" color="primary">Learn More</Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home;