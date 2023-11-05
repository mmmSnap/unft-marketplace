import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "react-image-lightbox/style.css";


const GridImage  =({images:imageProps})=> {
  const [index, setIndex] = useState(-1);
  const currentImage = imageProps[index];
  const nextIndex = (index + 1) % imageProps.length;
  const nextImage = imageProps[nextIndex] || currentImage;
  const prevIndex = (index + imageProps.length - 1) % imageProps.length;
  const prevImage = imageProps[prevIndex] || currentImage;

  const handleClick = (index) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <Grid container spacing={2} alignItems="center"
    justifyContent="center"> 
     <Grid item xs={10}>
     <Typography variant="h6" gutterBottom>
        Work Items 
      </Typography>
     </Grid>
     <Grid item xs={10}>
      <Gallery
        images={imageProps}
        onClick={handleClick}
        enableImageSelection={false}
        maxRows={4}
        rowHeight={300}
        margin={4}
      />
      {!!currentImage && (
        /* @ts-ignore */
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
      </Grid>
     </Grid>
  );
}

export default GridImage
