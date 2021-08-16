import Lottie from 'react-lottie'
import Header from './Header'
import { useCheckMobileScreen } from './HelpSliderHook'
import { triggerGTAG } from '../../../../utils/utils'

const L1Content = props => {
  const {
    styles,
    isLandLord,
    data,
    setCurrentLevelAndContentKey,
    contentKey
  } = props

  const isMobile = useCheckMobileScreen()

  const animationData =
    data &&
    data.lottieFile &&
    require(`../../../../public/lottieFiles/${
      isLandLord ? 'landlord' : 'tenant'
    }/${data.lottieFile}`)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    data && (
      <div className={styles['helpSliderContentContentWrapper--innerSlides']}>
        <Header
          goBack={true}
          setCurrentLevelAndContentKey={setCurrentLevelAndContentKey}
          level={0}
          linkKey={isLandLord ? 'LL_TOC' : 'TT_TOC'}
          styles={styles}
        />
        <h1
          className={`${styles['helpSliderTitle']} ${styles['helpSliderTitle--l1']}`}
        >
          {data && data.title}
        </h1>
        <Lottie
          options={defaultOptions}
          height={isMobile ? '14em' : '11em'}
          width={isMobile ? '17em' : '14em'}
        />
        <div className={styles['tableOfContent2List']}>
          {data &&
            data.links.map(item => (
              <div
                onClick={_ => {
                  triggerGTAG({ event: item.gtagEvent })
                  setCurrentLevelAndContentKey(2, item.link, contentKey)
                }}
                className={styles['tableOfContent2ListItem']}
              >
                <div className={styles['tableOfContent2ListItem__arrow']}>
                  <img
                    loading='lazy'
                    src='/img/icons/baseline-arrow_back.svg'
                  />
                </div>
                <div className={styles['tableOfContent2ListItem__text']}>
                  {item.title}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  )
}

export default L1Content
