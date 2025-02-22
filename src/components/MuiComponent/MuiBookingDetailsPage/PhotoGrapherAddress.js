
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
import moment from 'moment';

const PhotoGrapherAddress = ({ photoGrapherAddress, form, step = 0 }) => {

    const { getValues } = form
    const dateValue = getValues()
    const startDate = moment(dateValue.startDate)
    const endDate = moment(dateValue.endDate)
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>

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
                                <TableCell colSpan={2}> Photographer or studio address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {step === 1 && (<>
                                <TableRow>
                                    <TableCell component="th" scope="row" width={'35%'}>
                                        {'Start Date'}
                                    </TableCell>
                                    <TableCell align="left">{moment(startDate).format('DD-MM-YYYY')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" width={'35%'}>
                                        {'End Date'}
                                    </TableCell>
                                    <TableCell align="left">{moment(endDate).format('DD-MM-YYYY')}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" width={'35%'}>
                                        {'Number of booking days'}
                                    </TableCell>
                                    <TableCell align="left">{endDate.diff(startDate, 'days') + 1}</TableCell>
                                </TableRow>
                            </>
                            )}
                            <TableRow>
                                <TableCell component="th" scope="row" width={'35%'}>
                                    {'Name'}
                                </TableCell>
                                <TableCell align="left">{photoGrapherAddress.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {'Email ID'}
                                </TableCell>
                                <TableCell align="left">{photoGrapherAddress?.address || ''}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {'Flat House No'}
                                </TableCell>
                                <TableCell align="left">{photoGrapherAddress?.address || ''}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {'City '}
                                </TableCell>
                                <TableCell align="left">{'City'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {'State'}
                                </TableCell>
                                <TableCell align="left">{'State'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {'Country'}
                                </TableCell>
                                <TableCell align="left">{'Country'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </React.Fragment>)
}

export default PhotoGrapherAddress