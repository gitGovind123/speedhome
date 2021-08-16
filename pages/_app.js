import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

import { G_TAG_ID } from '../env'

import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/materialTheme'

import 'bootstrap/dist/css/bootstrap.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import '../styles/magnific-popup.min.css'
import '../styles/globals.scss'
import { pageview } from '../utils/utils'

const generateClassName = createGenerateClassName({
  productionPrefix: 'myclasses-'
})

function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  const [key, setKey] = React.useState(0)

  useEffect(() => {
    setKey(1)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/dengage-webpush-sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleRouteChange = url => {
    pageview(url)
  }

  return (
    <StylesProvider key={key} generateClassName={generateClassName}>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    </StylesProvider>
  )
}

export default MyApp
