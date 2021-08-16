import * as Sentry from '@sentry/nextjs'
import { BUILD_ENV } from './env'

if (BUILD_ENV === 'beta' || BUILD_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://c599678ebe1641e9aba219bff6296370@o348320.ingest.sentry.io/5822502',
    tracesSampleRate: 1.0,
    environment: BUILD_ENV === 'beta' ? 'development' : 'production'
  })
}
