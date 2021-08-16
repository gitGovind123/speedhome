import Document, { Html, Head, Main, NextScript } from 'next/document'
import { G_TAG_ID } from '../env'
import React from 'react'
import theme from '../styles/materialTheme'
import { ServerStyleSheets } from '@material-ui/core/styles'

const antiSnippetCss = `.async-hide { 
  opacity: 0 !important
}`

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction,

      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link
            rel='preload'
            href='/fonts/font.css'
            rel='stylesheet'
            as='style'
          />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            as='style'
          />
          <style>{antiSnippetCss}</style>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            !function(e,a,n,d,g)
            {
              ((e.dengage =
                e.dengage ||
                function () {
                  ;(e.dengage.q = e.dengage.q || []).push(arguments)
                }),
              (d = a.getElementsByTagName('head')[0]),
              ((g = a.createElement('script')).async = 1),
              (g.src =
                'https://pcdn.dengage.com/p/push/177/cb80850f-dd2d-1fe2-1124-138a51e864e6/dengage_sdk.js'),
              d.appendChild(g))
            }
            (window,document); dengage('initialize');
            `
            }}
          ></script>

          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${G_TAG_ID}`}
          /> */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
                h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
                (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
            })(window,document.documentElement,'async-hide','dataLayer',4000,
                {'${G_TAG_ID}':true});`
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
          setTimeout(function() {
            var gtm = document.createElement('script')
            gtm.src = 'https://www.googletagmanager.com/gtm.js?id=${G_TAG_ID}'
            gtm.async = true
            document.body.appendChild(gtm)
          }, 10);
        `
            }}
          />
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || []
          function gtag(){
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', '${G_TAG_ID}')
        `
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${G_TAG_ID}`}
              height='0'
              width='0'
              style={{
                display: 'none',
                visibility: 'hidden'
              }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />

          <script
            defer
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "speedhome.com",
                "item": "https://speedhome.com"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://speedhome.com/blog/"
              },{
                "@type": "ListItem",
                "position": 3,
                "name": "Pelajar, Bekerja atau Berkeluarga? – Ketahui 5 Jenis Penyewa Ini Yang Mungkin Anda Jumpa",
                "item": "https://speedhome.com/blog/?p=734"
              }]
            }
          `
            }}
          />

          <script
            defer
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "image": "https://image.speedrent.com/images/speedhome.png",
              "name": "SPEEDHOME",
            "url": "https://www.google.com/maps/place/SPEEDHOME/@3.1131483,101.5915448,15z/data=!4m2!3m1!1s0x0:0xf88a75c48e99c76?sa=X&ved=2ahUKEwj6i4TviIXnAhU_zzgGHXduCtMQ_BIwCnoECA8QCA",
              "telephone": "+60 18-777 7650",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "A-G-23, Eve Suite, Jalan PJU 1a/41, Ara Damansara",
                "addressLocality": "Petaling Jaya",
                "addressRegion": "Selangor",
                "postalCode": "47301",
                "addressCountry": "Malaysia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 3.126200,
                "longitude": 101.574180
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursdat",
                    "Friday"
                  ],
                  "opens": "10:00",
                  "closes": "18:00"
                }
              ]
          }
          `
            }}
          />

          <script
            defer
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://speedhome.com/",
              "logo": "https://image.speedrent.com/images/speedhome.png"
            }
          `
            }}
          />

          <script
            defer
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://speedhome.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://speedhome.com/rent/{m}?q={m}",
                "query-input": "required name=m"
              }
            }
          `
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
