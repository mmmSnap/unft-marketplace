import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DetailsCard from "./detailsCard";
import Divider from "@mui/material/Divider";
import GalleryList from "../Gallery/Gallery";
import ToastAlert from '../../styledComponent/Alert/ToastAlert'

import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import axios from "axios";
import { axionInstace } from "../../../globalServices/axionInstace";

const PhotographerHomeComponent = () => {
    const [photographer, setPhotographer] = useState({});
    const [imageList, setImageList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const refElement = React.createRef();

    function updateImageList(newImage) {
        setImageList((previousImageList) => {
            previousImageList.push(newImage);
            axionInstace.patch('/api/photographer', previousImageList).then(console.log);
            return [...previousImageList]
        });
    }

    useEffect(() => {
        new Uppy()
            .use(Dashboard, {inline: true, target: '#drag-drop', height: 284, width: 385})
            .use(XHR, {
                fieldName: "image",
                endpoint: `https://api.imgbb.com/1/upload?key=1c6a1c1cb367a0dab944586bd2076363`,
                getResponseData: (responseText, _) => {
                    let response = JSON.parse(responseText);
                    updateImageList({
                        id: response.data.id,
                        img: response.data.url,
                        title: response.data.image.name,
                        isAdded: false,
                    });
                    return {}
                }
            });
            axionInstace.get("/photographer")
            .then(response => response.data.items[0])
            .then(photographer => {
                setPhotographer({...photographer});
                return photographer;
            })
            .then(photographer => setImageList(photographer?.album??[]));
    }, []);

    const handleChange = ({id}) => {
        let count = 0;
        const updatedList = JSON.parse(JSON.stringify(imageList)).map((items) => {
            if (items.id === id) {
                items.isAdded = !items.isAdded;
            }
            if (items.isAdded) {
                count++;
            }
            return items;
        });
        if (count <= 5) {
            setImageList([...updatedList]);
            axios.patch('/photographer', updatedList);
        } else {
            window.scrollTo(0, 0)
            setIsOpen(true)
        }
    };
    const handleRemove = ({id}) => {
        const newListItem = imageList.filter((item) => !(item.id === id))
        setImageList([...newListItem]);
        axios.patch('/api/photographer', newListItem)
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    marginTop: "60px",
                    minWidth: "100vw",
                    minHeight: "40vh",
                }}
                ref={refElement}
            >

                <Grid container display="flex" spacing={1} sx={{width: "80%", color: "black"}}>
                    <ToastAlert
                        type={"warning"}
                        isOpen={isOpen}
                        message={"Maximum 5 photo you can select"}
                        setIsOpen={setIsOpen}
                    />
                    <Grid item xs={8} md={8}>
                        <Typography variant="h5">
                            {`Welcome, ${photographer?.first_name}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="body2" component="div">
                            {
                                "Guests can reserve your place 24 hours after you publish here's how to prepare"
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} mt="20px">
                        <DetailsCard/>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    //   marginTop: "10px",
                    minWidth: "100vw",
                    //   minHeight: "50vh",
                }}
            >
                <Grid
                    container
                    display="flex"
                    spacing={1}
                    sx={{width: "90%", marginTop: "10px"}}
                >
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" component="div">
                            {"Selected Image"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GalleryList
                            itemData={imageList.filter(({isAdded}) => isAdded)}
                            handleChage={handleChange}
                            handleRemove={handleRemove}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6" component="div">
                            {"Available image"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <GalleryList
                            itemData={imageList.filter(({isAdded}) => !isAdded)}
                            handleChage={handleChange}
                            handleRemove={handleRemove}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div id={"drag-drop"}></div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PhotographerHomeComponent;
