

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <>
    <CardContent>
      <Typography variant="body1" color="text.secondary" >
        Complete important details
      </Typography>
      <Typography  variant="body2" sx={{color:"red"}}  color="text.danger">
        Request to publish
      </Typography>
      <Typography  variant="body2" sx={{color:"red",textAlign:"right"}}  color="text.danger">
        Icon
      </Typography>
      <Button size="small" onClick={()=>''}>Continue</Button> 
    </CardContent>
  </>
);

export default function DetailsCard() {
    const  router = useRouter()
  return (
    <Box sx={{ maxWidth: 360 }}>
      <Card variant="outlined">
      <>
    <CardContent>
      <Typography variant="body1" color="text.secondary" >
        Complete important details
      </Typography>
      <Typography  variant="body2" sx={{color:"red"}}  color="text.danger">
        Request to publish
      </Typography>
      <Typography  variant="body2" sx={{color:"red",textAlign:"right"}}  color="text.danger">
        Icon
      </Typography>
      <Button size="small" onClick={()=>router.push('/photographer/profile')}>Continue</Button> 
    </CardContent>
  </>
      </Card>
    </Box>
  );
}

