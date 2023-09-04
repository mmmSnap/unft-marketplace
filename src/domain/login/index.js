import React from 'react';
import RadioButton from '../../components/RadioButton/RadioButton';
import Typography from '../../components/Typography/Typography';
import BlockButton from '../../components/BlockButton/BlockButton';
import InputElement from '../../components/InputElement/InputElement';
import IconGooglePlus from '../../svgIcons/IconGooglePlus';
import IconAvatar from '../../svgIcons/IconAvatar';
import Hr from '../../components/hr/Hr'
import style from './index.module.sass'
import { LoginTypeRadioOption } from './const'

function GoogleSignIn(provider, csrfToken, callbackUrl) {
    return (
        <form action={provider.signinUrl} method="POST" key={provider?.id || "google"}>
            <input type="hidden" name="csrfToken" value={csrfToken} />
            {callbackUrl && (
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
            )}
            <BlockButton varient='outlined' type="submit">
                <IconGooglePlus /> Contine with google
            </BlockButton>

        </form>);
}

const LoginComponent = ({ providers, csrfToken }) => {
    const [selectedOption, setSelectedOption] = React.useState('Explorer Login');
    providers = JSON.parse(providers)
    const callbackUrls = {
        explorer: "/",
        photographer: "/photographer/home"
    }
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.childDiv}>
                <div style={{ marginTop: "15px" }}>
                    <IconAvatar />
                </div>
                <div style={{ marginTop: "10px 0px" }}>
                    <Typography component="h1" variant="h5" >
                        Sign in or Sign up
                    </Typography>
                </div>

                <div className={style.radioInline}>
                    {LoginTypeRadioOption.map((items) => {
                        return (
                            <RadioButton
                                key={items.id}
                                label={items.name}
                                checked={selectedOption === items.name}
                                onChange={handleOptionChange}
                            />
                        )
                    })}

                </div>
                <div style={{ width: "80%", margin: "10px 0px" }}>
                    {Object.values(providers).map((provider) => {
                        if (provider.id === "otp-generation") {
                            return;
                        } else if (provider.id === "otp-verification") {
                            return;
                        } else if (provider.id === "google") {
                            return GoogleSignIn(provider, csrfToken, callbackUrls.explorer)
                        }
                    })}


                </div>
                <Hr>
                    OR
                </Hr>
                <div style={{ width: "80%", margin: "20px 0px" }}>
                    <InputElement />
                </div>
                <div style={{ width: "80%", margin: "20px 0px" }}>
                    <BlockButton    >
                        Submit
                    </BlockButton>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent