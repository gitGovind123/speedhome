import { triggerGTAG } from '../../../../utils/utils'

const TableOfContent = props => {
  const {
    styles,
    sessionUser,
    tableOfContent,
    checkIsLandLord,
    setCurrentLevelAndContentKey
  } = props
  return (
    <>
      <div className={styles['helpSliderContentContentWrapper']}>
        <div className={styles['tableOfContentTitleAndList']}>
          <div className={styles['tableOfContentTopHeader']}>
            <div className={styles['tableOfContentTopHeader__topTitle']}>
              {`Hi, ${sessionUser.name}`}
            </div>
            <div className={styles['tableOfContentTopHeader__mainTitle']}>
              Find out additional information to guide your experience on
              SPEEDHOME here
            </div>
          </div>
          <div className={styles['tableOfContentBlockWrapper']}>
            {tableOfContent &&
              tableOfContent.map(item => (
                <div
                  onClick={_ => {
                    triggerGTAG({ event: item.gtagEvent })
                    setCurrentLevelAndContentKey(1, item.link)
                  }}
                  key={item.title}
                  className={styles['tableOfContentBlock']}
                >
                  <div className={styles['tableOfContentBlock__imageBlock']}>
                    <img src={`/img/icons/${item.icon}`} alt={item.title} />
                  </div>
                  <div className={styles['tableOfContentBlock__contentBlock']}>
                    <div className={styles['tableOfContentBlock__contentText']}>
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles['tableOfContentFooter']}>
          <div className={styles['tableOfContentFooter__text']}>
            To get the optimal experience{' '}
            <a
              onClick={_ => {
                triggerGTAG({
                  event: checkIsLandLord
                    ? 'Web_IP_LL_Help_AppDownload'
                    : 'Web_IP_TT_Help_AppDownload'
                })
                window.open('https://get.speedhome.com', '_blank')
              }}
              href='#'
            >
              <span className={styles['underLineFooterLinks']}>
                Download The SPEEDHOME App
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableOfContent
