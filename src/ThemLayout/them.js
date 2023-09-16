import { createTheme, colors, makeStyles } from '@mui/material';


const ThemSetup = createTheme({
    palette: {
        secondary: {
            main: colors.orange[500]

        },
        primary: {
            main: '#4437ff'
        }

    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '24px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '24px',
                    textAlign: "center"
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    borderRadius: '24px'
                }
            }
        }
    },
    defaultMode: "light"
})

export default ThemSetup