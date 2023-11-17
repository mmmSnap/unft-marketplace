import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from '@mui/icons-material/Delete';
import { pink,red } from '@mui/material/colors';

export default function GalleryList(props) {
  const { itemData ,handleChage: handleChange,handleRemove} = props;
  const [show,setShow] = React.useState('')
  return (
    <ImageList
      variant="quilted"
      sx={{ width: "100%", height: "100%" }}
      cols={4}
      rowHeight={284}
      gap={2}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} onMouseEnter={()=>setShow(item.id)} onMouseLeave={()=>setShow('')} >
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          {show===item.id &&(
            <>
          <ImageListItemBar
            title={'Delete'}
            onClick = {()=>handleRemove(item)}

            actionIcon={
                <IconButton

                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                >
                <DeleteIcon  sx={{ color: red[800] }} />
                </IconButton>
              }
              actionPosition="left"
            />
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            title={item.isAdded ? "Removed" : "Add"}
            position="top"
            actionIcon={
              <IconButton
                onClick = {()=>handleChange(item)}
                sx={{ color: "white" }}
                aria-label={`star ${item.title}`}
              >
                {!item.isAdded ? (
                  <CheckBoxOutlineBlankIcon />
                ) : (
                  <CheckBoxIcon />
                )}
              </IconButton>
            }
            actionPosition="left"
          />
          </>)}
          
            </ImageListItem>
      ))}
    </ImageList>
  );
}
