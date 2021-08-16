import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import styles from './index.module.scss'

export const APP_URL = 'https://speedhome.app.link/header'
export const imageSliderArr = [
  { label: 'RENTAL', value: '/img/slider/Bidding Slider_Web.jpg' },
  { label: 'ZD', value: '/img/slider/ZD - DESKTOP.png' },
  { label: 'THANKS', value: '/img/slider/THANKS - DESKTOP.png' },
  { label: 'OCD', value: '/img/slider/OCD - DESKTOP.png' },
  { label: 'APP', value: '/img/slider/APP - DESKTOP.png' },
  { label: 'HR', value: '/img/slider/HR - DESKTOP.png' },
  { label: 'REFER', value: '/img/slider/REFER - DESKTOP.png' },
  { label: 'KTIC', value: '/img/slider/Ktic-DESKTOP.png' }
]
export const imageSliderMobileArr = [
  { label: 'RENTAL', value: '/img/slider/Bidding Slider_Mobile.jpg' },
  { label: 'ZD', value: '/img/slider/ZD - MOBILE.png' },
  { label: 'THANKS', value: '/img/slider/THANKS - MOBILE.png' },
  { label: 'OCD', value: '/img/slider/OCD - MOBILE.png' },
  { label: 'APP', value: '/img/slider/APP - MOBILE.png' },
  { label: 'HR', value: '/img/slider/HR - MOBILE .png' },
  { label: 'REFER', value: '/img/slider/REFER - MOBILE.png' },
  { label: 'KTIC', value: '/img/slider/Ktic-MOBILE.png' }
]

export const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  speed: 200,
  autoplay: false,
  autoplaySpeed: 5000,
  lazyLoad: true,
  nextArrow: (
    <div>
      <span className={styles['slick-next']}>
        <NavigateNextIcon />
      </span>
    </div>
  ),
  prevArrow: (
    <div>
      <span className={styles['slick-prev']}>
        <NavigateBeforeIcon />
      </span>
    </div>
  ),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
export const testimonialSettings = {
  ...sliderSettings,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 660,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

export const prefSettings = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1
}
