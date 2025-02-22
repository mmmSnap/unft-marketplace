import React from 'react'
import TextField from '@mui/material/TextField';


 /* eslint-disable react/display-name */
const TextInputFields = React.forwardRef((props,forwardedRef) => {
 const {isError,errorMessage,...rest} = props
    return (
        <TextField
            
            id="outlined-textarea"
            error={isError}
            helperText={isError?errorMessage:""}
            fullWidth={true}
            ref={forwardedRef}
            // size="small"
            {...rest}
            variant="standard"

        />
    )
})

export default TextInputFields
