import { Box, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }
}));

const Paginations = ({ itemsPerPage, totalItems }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const pageNumbers = React.useState(
        Math.ceil(totalItems / itemsPerPage)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box component="span">
            <Pagination
                count={pageNumbers}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
                size="large"
                classes={{ ul: classes.paginator }}
            />
        </Box>
    )
}

export default Paginations
