import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from 'next/router'
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import CardStepperImage from "./index";


export default function MediaCard({ name, items, bookNowHandler }) {
  const router = useRouter()

  let images = [
    {
      src: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
    },
    {
      src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250"
    },
    {
      src: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
    }
  ];
  images = items?.images?.filter((item) => item !== "" || item !== null || true).map((item) => { return { src: item } }) || images;
  images = images.length > 3 ? images.slice(0, 3) : images;

  const image = images[0]

  if (!image.src) {
    image.src = 'https://cdn.discordapp.com/attachments/989739723151007764/1142453498508750868/mmojahid_mmm_text_logo_camera_mmm_text_at_bottom_white_backgrou_8759878f-0d1f-4ef2-a64c-8098313dbea8.png'
  }
  return (
    <Card>
      <CardContent sx={{ padding: "0px" }}>
        <div style={{ cursor: "pointer" }} onClick={() => router.push(`/photographer/${items.key}`)}>
          {!!image?.src && (<Image src={image.src??'https://cdn.discordapp.com/attachments/989739723151007764/1142453498508750868/mmojahid_mmm_text_logo_camera_mmm_text_at_bottom_white_backgrou_8759878f-0d1f-4ef2-a64c-8098313dbea8.png'}
            alt="Picture of the author"
            width={image?.width || 360}
            height={image?.height || 250} />)}
        </div>

        <Typography variant="h6" component="div" sx={{ textAlign: 'left', marginLeft: "10px" }} >
          Name: {items?.name.substring(0, 10) || ''}
        </Typography>
        <Typography variant="body2" component="div" sx={{ textAlign: 'left', marginLeft: "10px" }} >
          Locations - {items?.address.substring(0, 15)}
        </Typography>
        <Typography variant="body2" component="div" sx={{ textAlign: 'left', marginLeft: "10px" }} >
          Price - {items?.price || 100}
        </Typography>
        <Typography variant="body2" component="div" sx={{ textAlign: 'left', marginLeft: "10px" }}>
          <Rating name="size-small" defaultValue={items?.rating} size="small" />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => bookNowHandler(items.key)}>Book Now</Button>
      </CardActions>
    </Card>
  );
}
