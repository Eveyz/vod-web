import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import RefreshTokenHandler from '../helper/refreshTokenHandler'
import '../styles/globals.css'

function MyApp({ 
  Component,
  pageProps : { session, ...pageProps }
}) {
  const [interval, setInterval] = useState(0)

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <Component {...pageProps} />
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  )
}

export default MyApp
