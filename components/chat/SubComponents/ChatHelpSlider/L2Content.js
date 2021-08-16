import Lottie from 'react-lottie'
import Header from './Header'
import { useCheckMobileScreen } from './HelpSliderHook'
import { triggerGTAG } from '../../../../utils/utils'

const L2Content = props => {
  const {
    styles,
    levelFrom,
    isLandLord,
    data,
    setCurrentLevelAndContentKey
  } = props

  const handleFooterLinks = (link, event) => {
    triggerGTAG({ event })
    window.open(link, '_blank')
  }

  const isMobile = useCheckMobileScreen()

  const animationData =
    data &&
    !data.isImage &&
    require(`../../../../public/lottieFiles/${
      isLandLord ? 'landlord' : 'tenant'
    }/${data.lottieFile}`)

  const defaultOptions = data &&
    !data.isImage && {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

  return (
    data && (
      <div className={styles['helpSliderContentContentWrapper']}>
        <div>
          <Header
            setCurrentLevelAndContentKey={setCurrentLevelAndContentKey}
            level={1}
            linkKey={levelFrom}
            goBack={true}
            styles={styles}
          />
          <h1
            className={`${styles['helpSliderTitle']} ${styles['helpSliderTitle--l2']}`}
          >
            {data && data.title}
          </h1>
          {data.isImage ? (
            <img
              loading='lazy'
              className={styles['helpSliderL2ContentImage']}
              src={`/img/${
                isLandLord ? 'chatInfoLandlord' : 'chatInfoTenant'
              }/${data.lottieFile}`}
            />
          ) : (
            <Lottie
              options={defaultOptions}
              height={isMobile ? '25em' : '21em'}
              width={isMobile ? '18em' : '15em'}
            />
          )}
        </div>
        <div className={styles['helpSliderL2FooterText']}>
          {data.footerText && data.footerText}{' '}
          {data.footerText && data.footerLinkText && (
            <a
              onClick={_ =>
                handleFooterLinks(data.footerLinkURL, data.gtagEvent)
              }
              href='#'
            >
              <span className={styles['underLineFooterLinks']}>
                {data.footerLinkText}
              </span>
            </a>
          )}{' '}
          {data.footerText2 && data.footerText2}{' '}
          {
            <a
              onClick={_ =>
                handleFooterLinks(data.footerLink2URL, data.gtagEvent)
              }
              href='#'
            >
              <span className={styles['underLineFooterLinks']}>
                {data.footerLink2Text}
              </span>
            </a>
          }{' '}
          {data.footerText3 && data.footerText3}
        </div>
      </div>
    )
  )
}

export default L2Content
