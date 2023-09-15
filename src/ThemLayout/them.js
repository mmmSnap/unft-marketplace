import { createTheme,colors,makeStyles} from '@mui/material';


const ThemSetup = createTheme({
    palette:{
        secondary:{
            main:colors.orange[500]
        }
    },
    defaultMode:"light"
})

export default ThemSetup