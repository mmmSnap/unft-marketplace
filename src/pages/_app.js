import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'

import '../styles/app.sass'
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
      <SessionProvider session={session}>
          <StateContext>
              <Toaster />
              <Component {...pageProps} />
          </StateContext>
      </SessionProvider>
  )
}

export default MyApp
