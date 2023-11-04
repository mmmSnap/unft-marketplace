import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "react-image-lightbox/style.css";
import { images } from "../../../../public/images/GridImage/image";


const GridImage  =()=> {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

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
        images={images}
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
