import React from 'react'
import { getDataByCategory, getAllDataByType } from '../../lib/cosmic'

import LoginComponent from '../../domain/login/index'
import Layout from '../../components/Layout';

const LoginPage = ({navigationItems}) => {

    const [selectedOption, setSelectedOption] = React.useState('Option 1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Layout navigationPaths={navigationItems[0]?.metadata}>
            <LoginComponent />
        </Layout>
    )
}

export async function getServerSideProps() {
    const navigationItems = (await getAllDataByType('navigation')) || []
    const landing = (await getAllDataByType('landings')) || []

    return {
        props: { navigationItems, landing },
    }
}

export default LoginPage
