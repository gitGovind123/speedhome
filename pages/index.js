import { useRouter } from 'next/router'
import HeadComponent from '../components/Common/Head'
import HomeComponent from '../components/HomePage/index'

const Home = props => {
  const router = useRouter()
  let title = ''
  let description = ''
  let keywords = ''
  if (router.locale === 'en') {
    title =
      'Apartment For Rent & Rumah Sewa in Malaysia, SPEEDRENT is SPEEDHOME'
    description = `All Online. Fast, Free & RM46k protection to Search / Advertise House for Free! Find Studio For Rent, Zero Deposit Apartments For Rent in KL, PJ, Cyberjaya`
    keywords = 'Home For Rent, Apartments For Rent, Property Listing Malaysia'
  } else if (router.locale === 'my') {
    title =
      'Senarai Hartanah Percuma di Malaysia | Rumah untuk Disewa/Dijual | Sifar Deposit'
    description =
      'Beli atau Sewa Rumah di SPEEDHOME dengan perlindungan dan Sifar Deposit. Portal Penyenaraian Rumah Sewa Terkemuka di Asia'
    keywords =
      'Rumah untuk disewa, Apartment untuk Disewa, Senarai Hartanah di Malaysia'
  } else if (router.locale === 'zh') {
    title = '免费刊登房屋广告| 免押金房屋出租/销售'
    description = '在SPEEDHOME有保障地零押金租或买产业。亚洲领先住宅产业平台'
    keywords = '房屋出租，公寓出租、马来西亚发布房源'
  }

  return (
    <>
      <HeadComponent
        title={title}
        description={description}
        keywords={keywords}
        isHomepage={true}
      >
        <link
          rel='preload'
          href='https://speedhome.com/zh'
          hrefLang='zh-cn'
          as='fetch'
        />
        <link
          rel='preload'
          href='https://speedhome.com/en'
          hrefLang='en-us'
          as='fetch'
        />
        <link
          rel='preload'
          href='https://speedhome.com/my'
          hrefLang='mg-my'
          as='fetch'
        />
        <script
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SPEEDHOME - Your Fast & Easy Home Rental Platform",
              "operatingSystem": ["ANDROID",
              "IOS"],
              "applicationCategory": "https://schema.org/GameApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "3.2",
                "ratingCount": "1954"
              },
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            }
          `
          }}
        />
      </HeadComponent>
      <HomeComponent />
    </>
  )
}

export default Home
