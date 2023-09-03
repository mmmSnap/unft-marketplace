import React from 'react'
import LoginComponent from '../../domain/login/index'
import RadioButton from '../../components/RadioButton/RadioButton'

const LoginPage = () => {

    const [selectedOption, setSelectedOption] = React.useState('Option 1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
       <LoginComponent />
    )
}

export default LoginPage
