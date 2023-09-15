import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'
import Layout from '../ThemLayout/layout';
import '../styles/app.sass'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <StateContext>
                    <Toaster />
                    <Component {...pageProps} />
                </StateContext>
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
