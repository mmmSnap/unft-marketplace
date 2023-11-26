
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const MuiBookingReviewForm = ({userAddress})=>{
//   console.log(userAddress)
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
           Booking Review Details
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                {/* <Typography gutterBottom>
                    name
                </Typography>
                <Typography gutterBottom>
                    {'mojahid'}
                </Typography> */}
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}> Booking Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" width={'35%'}>
                                {'First Name'}
                            </TableCell>
                            <TableCell align="left">{userAddress.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Last name'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.lastName || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Email id'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.emailId || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Phone Number '}
                            </TableCell>
                            <TableCell align="left">{userAddress.countryCode.label} {userAddress?.phoneNumber || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Address 1'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.address1 || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Address 2'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.address2 || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'City'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.city || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'State'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.state || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Zip Code'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.pincode || ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {'Country'}
                            </TableCell>
                            <TableCell align="left">{userAddress?.country.label || ''}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    </React.Fragment>
    )
}

export default MuiBookingReviewForm