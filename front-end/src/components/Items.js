import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root2: {
            maxWidth: 345,
            margin: theme.spacing(1),
        },
        media: {
            height: 140,
        },
    }),
);

const Items = ({ items, loading }) => {
    const classes = useStyles();

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        items.map((item) => (
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
        )
    )
}

export default Items
