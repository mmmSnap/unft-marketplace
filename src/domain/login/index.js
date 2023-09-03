import React from 'react';
import RadioButton from '../../components/RadioButton/RadioButton';
import Typography from '../../components/Typography/Typography';
import style from './index.module.sass'
import {LoginTypeRadioOption}  from './const'

const LoginComponent = () => {
    const [selectedOption, setSelectedOption] = React.useState('Explorer Login');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.childDiv}>
                <div>
                <Typography component="h1" variant="h5" >
                   Sign in or Sign up
                </Typography>
                </div>
              
                <div className={style.radioInline}>
                    {LoginTypeRadioOption.map((items)=>{
                        return (
                            <RadioButton
                            key={items.id}
                            label={items.name}
                            checked={selectedOption ===items.name}
                            onChange={handleOptionChange}
                        />
                        )
                    })}
                   
                </div>

            </div>
        </div>
    )
}

export default LoginComponent