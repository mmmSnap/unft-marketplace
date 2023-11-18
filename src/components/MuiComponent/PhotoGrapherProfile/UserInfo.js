
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { COUNTRY_CODE, EMAIL_ID, EXPERTISE, FIRST_NAME, GENDER, LAST_NAME, PHONE_NUMBER,DATE_OF_BIRTH, PRICE, PRICE_VALUE, SKILLS } from '../consts/consts'
import TextInputFields from '../formsElement/TextInputFields'
import { Divider } from '@mui/material';
import SelectAutoComplete from '../formsElement/SelectAutoComplete';

import CONST_FILE from '../consts/translation.json'

// import MaterialUIPickers from './formsElement/DatePicker';
import DatePickerTest from '../formsElement/DatePickerLocal';

const AddressType = [
    { label: "Business/Studio Address" },
    { label: "Personal Address" }
]

const UserInfo = ({ fieldsForm,data ,control}) => {
   

    return (
        <>
            
                <Typography variant="h4" component="div" sx={{ flexGrow: 1, mt: 1, mb: 3 }} >
                    {CONST_FILE.photoGrapherDetails}
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={1} >
                    <Grid item xs={6} md={6}>
                        <TextInputFields
                            fullWidth={'true'}
                            data-testid="first-name-id"
                            label="First Name"
                            {...fieldsForm[FIRST_NAME]}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextInputFields
                            id="outlined-textarea"
                            label="Last Name"
                            // placeholder="Placeholder"
                            fullWidth={'true'}
                            // size="small"
                            {...fieldsForm[LAST_NAME]}

                        />
                    </Grid>
                    <Grid item xs={6} md={12}>
                      
                        
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <TextInputFields
                            id="outlined-textarea"
                            label="Email id"
                            placeholder="Placeholder"
                            fullWidth={'true'}
                            {...fieldsForm[EMAIL_ID]}

                        />
                    </Grid>
                    <Grid item xs={2} md={4}>
                        {/* <SelectWithSearch data={countryCode} fieldName="Code" /> */}
                        <SelectAutoComplete  {...fieldsForm[COUNTRY_CODE]}  />

                    </Grid>
                    <Grid item xs={4} md={8}>
                        <TextInputFields
                            required
                            id="outlined-textarea"
                            label="Phone Number"
                            placeholder="Placeholder"
                            fullWidth={'true'}
                            // size="small"
                            {...fieldsForm[PHONE_NUMBER]}

                        />
                    </Grid>


                    <Grid item xs={6} md={4}>
                    <DatePickerTest  {...fieldsForm[DATE_OF_BIRTH]}/>
                        {/* <DatePickers DATE_OF_BIRTH /> */}
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <SelectAutoComplete   label="Gender" {...fieldsForm[GENDER]} defaultValue={data[GENDER]} />
                    </Grid>
                </Grid>
            {/* </Grid> */}
        </>
    )
}

export default UserInfo
