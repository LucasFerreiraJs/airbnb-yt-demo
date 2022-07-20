import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Header } from '../components/base/Header'
import { Footer } from '../components/base/Footer'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'

const progress = new ProgressBar({
  size: 4,
  color: '#fe595e',
  className:'z-50',
  delay: 200
});

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      <Footer />
    </>
  )
}

export default MyApp
