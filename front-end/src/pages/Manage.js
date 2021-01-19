import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as API from '../services/axios';

const fabricTypes = [
    {
        value: '1',
        label: 'โพลีเอสเตอร์',
    },
    {
        value: '2',
        label: 'ไหมอิตาลี',
    },
    {
        value: '3',
        label: 'สปัน',
    }
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        imgPreview: {
            textAlign: 'center',
            margin: "5px 15px",
            height: "150px",
            width: "150px",
            borderLeft: "2px solid #3f51b5",
            borderRight: "2px solid #3f51b5",
            borderTop: "2px solid #3f51b5",
            borderBottom: "2px solid #3f51b5",
            boxShadow: "5px 5px 16px -6px rgba(0,0,0,0.75)",
            color: '#3f51b5'
        },
        uploadFile: {
            textAlign: 'center',
            margin: "5px 15px",
            borderLeft: "2px solid #3f51b5",
            borderRight: "2px solid #3f51b5",
            borderTop: "2px solid #3f51b5",
            borderBottom: "2px solid #3f51b5",
        },
        img: {
            width: '100%',
            height: '100%',
        },
        paper: {
            padding: theme.spacing(2),
        },
        left100: {
            paddingLeft: '100px',
        },
    }),
);

export default function Manage(props) {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [imgName, setImgName] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [fabricType, setFabricType] = React.useState('1');
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);
    //update
    const [isUpdate, setIsUpdate] = useState(false);
    const [objUpdate, setObjUpdate] = useState({
        id: null,
        img_name: "",
        file_name: "",
        fabric_type: null
    })

    useEffect(() => {
        startFn()
    }, [objUpdate])

    const startFn = () => {
        if (!checkEmpty(props.location.state)) {
            setObjUpdate(props.location.state.data);
            handleChangeImgName(objUpdate.img_name);
            setIsUpdate(true)
        }
    }

    const checkEmpty = (data) => {
        let isEmty = false;
        if (undefined === data) {
            isEmty = true;
        }
        return isEmty;
    }

    const handleChangeImgName = (value) => {
        setImgName(value);
    };

    const handleChange = (event) => {
        setFabricType(event.target.value);
    };

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', file);
        data.append('img_name', imgName);
        data.append('fabric_type', fabricType);
        API.upload(data);
        setIsUploadSuccess(true);
    }

    const onClickUpdateHandler = () => {
        const data = new FormData();
        data.append('file', file);
        data.append('img_name', imgName);
        data.append('file_name', props.location.state.data.file_name);
        data.append('fabric_type', fabricType);
        API.update(objUpdate.id, data);
        setIsUploadSuccess(true);
    }

    const onClickClearHandler = () => {
        setImgName("");
        setFile()
        setImagePreviewUrl()
        setIsUpdate(false);
    }

    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} className={classes.img} />);
    } else {
        if (isUpdate) {
            $imagePreview = (<img src={`../images/${objUpdate.file_name}`} className={classes.img} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
    }

    if (isUploadSuccess) {
        return (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        )
    }

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={1} className={classes.left100}>
                <Grid item xs={12}>
                    <input
                        className={classes.uploadFile}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.imgPreview}>
                        {$imagePreview}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12} className={classes.paper}>
                        <TextField
                            id="img_name"
                            label="ชื่อสินค้า"
                            variant="outlined"
                            value={imgName}
                            onChange={e => handleChangeImgName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        <TextField
                            id="standard-select-fabric-type"
                            select
                            label="เนื้อผ้า"
                            value={fabricType}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            {fabricTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.paper}>
                        {isUpdate ?
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onClickUpdateHandler}>
                                แก้ไข
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onClickHandler}>
                                อัพโหลด
                            </Button>
                        }
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClickClearHandler}>
                            ล้าง
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <br />
        </div>
    );
}
