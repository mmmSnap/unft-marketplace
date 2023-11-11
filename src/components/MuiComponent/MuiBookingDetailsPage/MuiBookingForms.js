import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import userInfoForm from './hooks/userInfoForm';

const mandatoryError  ='This field is mandatory'
export default function MuiBookingForms(photoGrapherAddress) {

  const { register, formState: { errors } } = userInfoForm()
  console.log('errors',photoGrapherAddress)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            {...register('firstName', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['firstName']}
            helperText={errors['firstName']?errors['firstName'].message:""}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            {...register('lastName', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['lastName']}
            helperText={errors['lastName']?errors['lastName'].message:""}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            {...register('address1', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['address1']}
            helperText={errors['address1']?errors['address1'].message:""}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            {...register('address2', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['address2']}
            helperText={errors['address2']?errors['address2'].message:""}
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            {...register('city', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['city']}
            helperText={errors['city']?errors['city'].message:""}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            {...register('state', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['state']}
            helperText={errors['state']?errors['state'].message:""}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            {...register('pincode', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['pincode']}
            helperText={errors['pincode']?errors['pincode'].message:""}
            name="pincode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            {...register('country', {
              required: {
                value: true,
               message: mandatoryError
              }
            })}
            error={errors['country']}
            helperText={errors['country']?errors['country'].message:""}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}