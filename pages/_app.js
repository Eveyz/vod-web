import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { GlobalDataProvider } from '../helper/GlobalDataContext'
import RefreshTokenHandler from '../helper/refreshTokenHandler'
import '../styles/globals.css'

function MyApp({ 
  Component,
  pageProps : { session, ...pageProps }
}) {
  const [interval, setInterval] = useState(0)

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <GlobalDataProvider>
        <Component {...pageProps} />
      </GlobalDataProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  )
}

export default MyApp
