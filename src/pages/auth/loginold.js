import React from 'react'
import axios from 'axios'
import {getCsrfToken, signIn} from "next-auth/react"
import {getServerSession} from "next-auth/next"
import {authOptions} from "../api/auth/[...nextauth]";
import {  getAllDataByType } from '../../lib/cosmic'

import LoginComponent from '../../domain/login/index'
import Layout from '../../components/Layout';

const LoginPage = ({navigationItems,...rest}) => {

    const [selectedOption, setSelectedOption] = React.useState('Option 1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Layout navigationPaths={navigationItems[0]?.metadata}>
            <LoginComponent {...rest} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const navigationItems = (await getAllDataByType('navigation')) || []
    const landing = (await getAllDataByType('landings')) || []
    const session = await getServerSession(context.req, context.res, authOptions);
    const csrfToken = await getCsrfToken(context)
    const providers = JSON.stringify((await axios.get(`${process.env.BASE_URL}api/auth/providers`, {headers: context.req.headers})).data);
    if (session) {
        return {redirect: {destination: "/"}};
    }
    return {
        props: { providers: providers ?? [], csrfToken: csrfToken ?? "",navigationItems, landing },
    }
}

export default LoginPage
