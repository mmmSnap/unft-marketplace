import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const MuiLoader = ({loading,height=40}) => {
//  const loading = true
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center', height }} >
                <Fade
                    in={loading}
                   
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress  />
                </Fade>
            </Box>
        </Box>
    );

}
export default MuiLoader