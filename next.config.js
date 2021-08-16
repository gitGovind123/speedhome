const nextTranslate = require('next-translate')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  future: {
    webpack5: true
  },
  ...nextTranslate(),
  crossOrigin: 'anonymous',
  i18n: {
    locales: ['en', 'my', 'zh'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['image.speedhome.com']
  },
  async redirects () {
    return [
      {
        source: '/speedsign',
        destination: 'https://speedmanage.com/',
        permanent: true
      },
      {
        source: '/sewa/:loc/:types/:fallback',
        destination: '/',
        permanent: true
      },
      {
        source: '/rent/:loc/:types/:fallback1/:fallback2',
        destination: '/',
        permanent: true
      },
      {
        source: '/rent/:loc/:types/:fallback',
        destination: '/',
        permanent: true
      },
      {
        source: '/search/:area',
        destination: `/rent/:area`,
        permanent: true
      },
      {
        source: '/search',
        destination: '/rent',
        permanent: true
      },
      {
        source: '/dashboard/rental/external',
        destination: '/dashboard/rental',
        permanent: true
      },
      {
        source: '/more/landlord/guide',
        destination: '/',
        permanent: true
      },
      {
        source: '/more/landlord/protected',
        destination: '/',
        permanent: true
      },
      {
        source: '/more/landlord/protected',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/author/',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/tag/',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/my/6655GG',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/wp-login.php',
        destination: '/blog',
        permanent: true
      }
    ]
  }
}

const SentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
