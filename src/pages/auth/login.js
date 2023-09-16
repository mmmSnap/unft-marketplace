import { getCsrfToken, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ThemLayout from "../../ThemLayout/layout";
// import Layout from "../../components/Layout";

const defaultTheme = createTheme();

export function ExplorerPhotographersLoginToggleButton({ setLoginType }) {
    return (
        <FormControl sx={{ margin: "10px 0px" }}>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="explorer"
                onChange={(e) => setLoginType(e.target.value)}
            >
                <FormControlLabel value="explorer" control={<Radio />} label="Explorer Login" />
                <FormControlLabel value="photographer" control={<Radio />} label="Photographer Login" />
            </RadioGroup>
        </FormControl>
    );
}

function OTPGenerator(provider, csrfToken, callbackUrl) {
    return <div key={provider.name}>
        <form action={provider.callbackUrl} method="POST">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <TextField
                margin="normal"
                required
                fullWidth
                // size="small"
                name="email"
                label="Enter Email"
                type="email"
                id={`input-email-for-${provider.id}-provider`}
                autoComplete="email"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >Send OTP</Button>
        </form>
    </div>;
}

function OTPVerifier(provider, csrfToken, callbackUrl) {
    return <div key={provider.name}>
        <form action={provider.callbackUrl} method="POST">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                name="code"
                label="Enter OTP"
                type="number"
                id={`input-code-for-${provider.id}-provider`}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >Submit OTP</Button>
        </form>
    </div>;
}

function GoogleSignIn(provider, csrfToken, callbackUrl) {
    return (
        <form action={provider.signinUrl} method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            {callbackUrl && (
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
            )}
            <Button
                type="submit"
                fullWidth
                color="inherit"
                variant="outlined"
                startIcon={<GoogleIcon color="error" />}
                sx={{ mt: 3, mb: 2 }}
            >
                Continue with Google
            </Button>
            <Divider>or</Divider>
        </form>);
}

export default function SignIn({ providers, csrfToken }) {
    providers = JSON.parse(providers)

    const [persona, setPersona] = React.useState("explorer")

    const callbackUrls = {
        explorer: "/",
        photographer: "/photographer/home"
    }

    return (<ThemLayout >
  
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: 0.5,
                    padding: "15px",
                    borderRadius: 1,
                    borderColor: 'primary.main'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in or Sign up
                </Typography>
                <Box
                    // component="form"

                    noValidate
                    sx={{ mt: 2 }}
                >
                    <ExplorerPhotographersLoginToggleButton loginType={persona} setLoginType={setPersona} />
                    {Object.values(providers).map((provider) => {
                        if (provider.id === "otp-generation") {
                            return OTPGenerator(provider, csrfToken, callbackUrls[persona])
                        } else if (provider.id === "otp-verification") {
                            return OTPVerifier(provider, csrfToken, callbackUrls[persona])
                        } else if (provider.id === "google") {
                            return GoogleSignIn(provider, csrfToken, callbackUrls[persona])
                        }
                    })}
                </Box>
            </Box>
        </Container>
    </ThemLayout>)
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const csrfToken = await getCsrfToken(context)

    if (session) {
        return { redirect: { destination: "/" } };
    }
    const providers = JSON.stringify((await axios.get(`${process.env.BASE_URL}api/auth/providers`, { headers: context.req.headers })).data);
    return {
        props: { providers: providers ?? [], csrfToken: csrfToken ?? "" }
    }
}