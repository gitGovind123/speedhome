import React from 'react'
import {
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_ERROR
} from 'react-redux-notify'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

export const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i

export const token = 'KcIQDwN1LZap0nHByVZROKum1JxCRNpd'
export const admin_token = 'adm_3WvXqd5kLkMNdy2ZnGyV5h8LbnrtwV'

export const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.speedrent'
export const APP_STORE_LINK =
  'https://apps.apple.com/us/app/speedhome-property-rental/id998232868'

export const toast = {
  ToastTimeout: 2000
}

export const playStorePupUpRoute = [
  '/',
  '/en',
  '/my',
  '/zh',
  '/my/dashboard/chat',
  '/zh/dashboard/chat',
  '/en/dashboard/chat',
  '/dashboard/chat'
]

export const privateRoute = ['/my/dashboard', '/zh/dashboard', '/dashboard']

export const langText = {
  my: 'iklan',
  zh: 'guanggao',
  en: 'ads'
}

export const successNotify = msg => ({
  message: msg,
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 3000,
  canDismiss: true,
  icon: <CheckIcon />
})

export const errorNotify = msg => ({
  message: msg,
  type: NOTIFICATION_TYPE_ERROR,
  duration: 3000,
  canDismiss: true,
  icon: <CloseIcon />
})

export const listingQuery = {
  ACTIVE: {
    status: 'ACTIVE',
    active: true
  },
  INACTIVE: {
    status: 'ACTIVE',
    active: false
  },
  SUSPENDED: {
    status: 'SUSPENDED'
  },
  EXPIRED: {
    status: 'EXPIRED',
    active: true
  }
}

export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '2px solid rgb(114, 114, 114)',
    boxShadow: 'none',
    borderRadius: '0',
    opacity: '1',
    minHeight: '48px',
    fontSize: '17px',

    '&:hover': {
      borderColor: 'rgb(114, 114, 114)'
    }
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'rgb(114, 114, 114)',
    padding: '0 8px',
    transition: 'all .4s ease',
    transform: state.selectProps.menuIsOpen
      ? 'rotate(-180deg)'
      : 'rotate(0deg)',

    svg: {
      width: '35px',
      height: '35px'
    }
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none'
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? 'rgb(249, 249, 249)' : 'rgb(255, 255, 255)',
    height: '50px',
    paddingTop: '13px',
    fontWeight: '700',
    fontSize: '18px',
    color: 'rgb(114, 114, 114)',
    borderBottom: '1px solid rgb(181, 181, 181)',

    '&:last-child': {
      borderBottom: 'none'
    },

    '&:hover': {
      background: 'rgb(249, 249, 249)',
      color: 'rgb(114, 114, 114)'
    }
  }),

  menuList: (provided, state) => ({
    ...provided,
    padding: '0',
    borderRadius: '4px',
    zIndex: 701
  })
}

export const roomTypesConst = [
  { key: 1, section: true, label: 'Single', value: 'small' },
  { key: 2, section: false, label: 'Middle', value: 'medium' },
  { key: 3, section: false, label: 'Master', value: 'master' }
]

export const countries = [
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Aland Islands', label: 'Åland Islands' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'American Samoa', label: 'American Samoa' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Aruba', label: 'Aruba' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bermuda', label: 'Bermuda' },
  { value: 'Bhutan', label: 'Bhutan' },
  {
    value: 'Bolivia, Plurinational State of',
    label: 'Bolivia, Plurinational State of'
  },
  {
    value: 'Bonaire, Sint Eustatius and Saba',
    label: 'Bonaire, Sint Eustatius and Saba'
  },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Bouvet Island', label: 'Bouvet Island' },
  { value: 'Brazil', label: 'Brazil' },
  {
    value: 'British Indian Ocean Territory',
    label: 'British Indian Ocean Territory'
  },
  { value: 'Brunei Darussalam', label: 'Brunei Darussalam' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Cape Verde', label: 'Cape Verde' },
  { value: 'Cayman Islands', label: 'Cayman Islands' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Christmas Island', label: 'Christmas Island' },
  { value: 'Cocos (Keeling) Islands', label: 'Cocos (Keeling) Islands' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Congo', label: 'Congo' },
  {
    value: 'Congo, the Democratic Republic of the',
    label: 'Congo, the Democratic Republic of the'
  },
  { value: 'Cook Islands', label: 'Cook Islands' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Cuba', label: 'Cuba' },
  { value: 'Curaçao', label: 'Curaçao' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czech Republic', label: 'Czech Republic' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  {
    value: 'Falkland Islands (Malvinas)',
    label: 'Falkland Islands (Malvinas)'
  },
  { value: 'Faroe Islands', label: 'Faroe Islands' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'French Guiana', label: 'French Guiana' },
  { value: 'French Polynesia', label: 'French Polynesia' },
  {
    value: 'French Southern Territories',
    label: 'French Southern Territories'
  },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'Gambia', label: 'Gambia' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Gibraltar', label: 'Gibraltar' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Greenland', label: 'Greenland' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guadeloupe', label: 'Guadeloupe' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guernsey', label: 'Guernsey' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  {
    value: 'Heard Island and McDonald Islands',
    label: 'Heard Island and McDonald Islands'
  },
  {
    value: 'Holy See (Vatican City State)',
    label: 'Holy See (Vatican City State)'
  },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Iran, Islamic Republic of', label: 'Iran, Islamic Republic of' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Isle of Man', label: 'Isle of Man' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Jersey', label: 'Jersey' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Kiribati', label: 'Kiribati' },
  {
    value: "Korea, Democratic People's Republic of",
    label: "Korea, Democratic People's Republic of"
  },
  { value: 'Korea, Republic of', label: 'Korea, Republic of' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  {
    value: "Lao People's Democratic Republic",
    label: "Lao People's Democratic Republic"
  },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Macao', label: 'Macao' },
  {
    value: 'Macedonia, the former Yugoslav Republic of',
    label: 'Macedonia, the former Yugoslav Republic of'
  },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Mayotte', label: 'Mayotte' },
  { value: 'Mexico', label: 'Mexico' },
  {
    value: 'Micronesia, Federated States of',
    label: 'Micronesia, Federated States of'
  },
  { value: 'Moldova, Republic of', label: 'Moldova, Republic of' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'New Caledonia', label: 'New Caledonia' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Nicaragua', label: 'Nicaragua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Niue', label: 'Niue' },
  { value: 'Norfolk Island', label: 'Norfolk Island' },
  { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Palau', label: 'Palau' },
  {
    value: 'Palestinian Territory, Occupied',
    label: 'Palestinian Territory, Occupied'
  },
  { value: 'Panama', label: 'Panama' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Pitcairn', label: 'Pitcairn' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Russian Federation', label: 'Russian Federation' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Saint Barthélemy', label: 'Saint Barthélemy' },
  {
    value: 'Saint Helena, Ascension and Tristan da Cunha',
    label: 'Saint Helena, Ascension and Tristan da Cunha'
  },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Martin (French part)', label: 'Saint Martin (French part)' },
  { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
  {
    value: 'Saint Vincent and the Grenadines',
    label: 'Saint Vincent and the Grenadines'
  },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Sint Maarten (Dutch part)', label: 'Sint Maarten (Dutch part)' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Africa', label: 'South Africa' },
  {
    value: 'South Georgia and the South Sandwich Islands',
    label: 'South Georgia and the South Sandwich Islands'
  },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Svalbard and Jan Mayen', label: 'Svalbard and Jan Mayen' },
  { value: 'Swaziland', label: 'Swaziland' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Syrian Arab Republic', label: 'Syrian Arab Republic' },
  { value: 'Taiwan, Province of China', label: 'Taiwan, Province of China' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  {
    value: 'Tanzania, United Republic of',
    label: 'Tanzania, United Republic of'
  },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Timor-Leste', label: 'Timor-Leste' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tokelau', label: 'Tokelau' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  {
    value: 'United States Minor Outlying Islands',
    label: 'United States Minor Outlying Islands'
  },
  { value: 'Uruguay', label: 'Uruguay' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  {
    value: 'Venezuela, Bolivarian Republic of',
    label: 'Venezuela, Bolivarian Republic of'
  },
  { value: 'Viet Nam', label: 'Viet Nam' },
  { value: 'Virgin Islands, British', label: 'Virgin Islands, British' },
  { value: 'Virgin Islands, U.S.', label: 'Virgin Islands, U.S.' },
  { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
  { value: 'Western Sahara', label: 'Western Sahara' },
  { value: 'Yemen', label: 'Yemen' },
  { value: 'Zambia', label: 'Zambia' }
]

export const postCodes = [
  {
    area: 'Negeri Sembilan',
    postcodes: [
      {
        city: 'Bahau',
        postcodes: [72100, 72107, 72109]
      },
      {
        city: 'Bandar Baru Enstek',
        postcodes: [71760]
      },
      {
        city: 'Bandar Seri Jempol',
        postcodes: [72120, 72127, 72129]
      },
      {
        city: 'Batu Kikir',
        postcodes: [72200, 72207, 72209]
      },
      {
        city: 'Gemas',
        postcodes: [73400, 73409, 73420, 73480]
      },
      {
        city: 'Gemencheh',
        postcodes: [73200, 73207, 73209, 73300, 73309]
      },
      {
        city: 'Johol',
        postcodes: [73000, 73100, 73109]
      },
      {
        city: 'Kota',
        postcodes: [71350, 71359]
      },
      {
        city: 'Kuala Klawang',
        postcodes: [71600, 71609, 71650, 71659]
      },
      {
        city: 'Kuala Pilah',
        postcodes: [72000, 72007, 72009, 72500, 72507, 72509]
      },
      {
        city: 'Labu',
        postcodes: [71900, 71907, 71909]
      },
      {
        city: 'Linggi',
        postcodes: [71150, 71159]
      },
      {
        city: 'Mantin',
        postcodes: [71700, 71707, 71709, 71750, 71759]
      },
      {
        city: 'Nilai',
        postcodes: [71800, 71807, 71809]
      },
      {
        city: 'Port Dickson',
        postcodes: [71000, 71007, 71009, 71010, 71960]
      },
      {
        city: 'Pusat Bandar Palong',
        postcodes: [73430, 73440, 73450, 73460, 73470]
      },
      {
        city: 'Rantau',
        postcodes: [71010, 71100, 71109, 71200, 71209]
      },
      {
        city: 'Rembau',
        postcodes: [71300, 71309, 71400, 71409]
      },
      {
        city: 'Rompin',
        postcodes: [73500, 73507, 73509]
      },
      {
        city: 'Seremban',
        postcodes: [
          70000,
          70100,
          70200,
          70300,
          70400,
          70450,
          70500,
          70502,
          70503,
          70504,
          70505,
          70506,
          70508,
          70512,
          70516,
          70517,
          70518,
          70532,
          70534,
          70536,
          70540,
          70546,
          70548,
          70550,
          70551,
          70558,
          70560,
          70564,
          70570,
          70572,
          70576,
          70578,
          70582,
          70586,
          70590,
          70592,
          70594,
          70596,
          70600,
          70604,
          70606,
          70608,
          70609,
          70610,
          70620,
          70626,
          70628,
          70632,
          70634,
          70644,
          70646,
          70648,
          70658,
          70664,
          70670,
          70672,
          70673,
          70674,
          70676,
          70690,
          70700,
          70710,
          70720,
          70730,
          70740,
          70750,
          70990,
          71450,
          71459,
          71770,
          71950
        ]
      },
      {
        city: 'Si Rusa',
        postcodes: [71050, 71059, 71250, 71259]
      },
      {
        city: 'Simpang Durian',
        postcodes: [72400, 72409]
      },
      {
        city: 'Simpang Pertang',
        postcodes: [72300, 72307, 72309]
      },
      {
        city: 'Tampin',
        postcodes: [73000, 73007, 73009]
      },
      {
        city: 'Tanjong Ipoh',
        postcodes: [71500, 71509, 71550, 71559]
      }
    ]
  },
  {
    area: 'Wilayah Persekutuan (Kuala Lumpur)',
    postcodes: [
      {
        city: 'Batu Caves',
        postcodes: [68100]
      },
      {
        city: 'Cheras',
        postcodes: [56000, 56100]
      },
      {
        city: 'Kuala Lumpur',
        postcodes: [
          50000,
          50050,
          50088,
          50100,
          50150,
          50200,
          50250,
          50300,
          50350,
          50400,
          50450,
          50460,
          50470,
          50480,
          50490,
          50500,
          50502,
          50504,
          50505,
          50506,
          50507,
          50508,
          50512,
          50514,
          50515,
          50519,
          50528,
          50529,
          50530,
          50532,
          50534,
          50536,
          50540,
          50544,
          50546,
          50548,
          50550,
          50551,
          50552,
          50554,
          50556,
          50560,
          50562,
          50564,
          50566,
          50568,
          50572,
          50576,
          50578,
          50580,
          50582,
          50586,
          50588,
          50590,
          50592,
          50594,
          50596,
          50598,
          50599,
          50600,
          50603,
          50604,
          50605,
          50608,
          50609,
          50610,
          50612,
          50614,
          50620,
          50621,
          50622,
          50623,
          50626,
          50632,
          50634,
          50636,
          50638,
          50640,
          50642,
          50644,
          50646,
          50648,
          50650,
          50652,
          50653,
          50656,
          50658,
          50660,
          50661,
          50662,
          50664,
          50666,
          50668,
          50670,
          50672,
          50673,
          50676,
          50677,
          50678,
          50680,
          50682,
          50684,
          50688,
          50694,
          50700,
          50702,
          50704,
          50706,
          50708,
          50710,
          50712,
          50714,
          50716,
          50718,
          50720,
          50722,
          50724,
          50726,
          50728,
          50730,
          50732,
          50734,
          50736,
          50738,
          50740,
          50742,
          50744,
          50746,
          50748,
          50750,
          50752,
          50754,
          50758,
          50760,
          50762,
          50764,
          50766,
          50768,
          50770,
          50772,
          50774,
          50776,
          50778,
          50780,
          50782,
          50784,
          50786,
          50788,
          50790,
          50792,
          50794,
          50796,
          50798,
          50800,
          50802,
          50804,
          50806,
          50808,
          50810,
          50812,
          50814,
          50816,
          50818,
          50901,
          50902,
          50903,
          50904,
          50906,
          50907,
          50908,
          50909,
          50910,
          50911,
          50912,
          50913,
          50914,
          50915,
          50916,
          50917,
          50918,
          50919,
          50920,
          50921,
          50922,
          50923,
          50924,
          50925,
          50926,
          50927,
          50928,
          50929,
          50930,
          50931,
          50932,
          50933,
          50934,
          50935,
          50936,
          50937,
          50938,
          50939,
          50940,
          50941,
          50942,
          50943,
          50944,
          50945,
          50946,
          50947,
          50948,
          50949,
          50950,
          50988,
          50989,
          50990,
          51000,
          51100,
          51200,
          51700,
          51990,
          52000,
          52100,
          52200,
          53000,
          53100,
          53200,
          53300,
          53700,
          53800,
          53990,
          54000,
          54100,
          54200,
          55000,
          55100,
          55200,
          55300,
          55700,
          55710,
          55720,
          55900,
          55902,
          55904,
          55906,
          55908,
          55910,
          55912,
          55914,
          55916,
          55918,
          55920,
          55922,
          55924,
          55926,
          55928,
          55930,
          55932,
          55934,
          55990,
          56000,
          56100,
          57000,
          57100,
          57700,
          57990,
          58000,
          58100,
          58200,
          58700,
          58990,
          59000,
          59100,
          59200,
          59700,
          59800,
          59990,
          60000
        ]
      },
      {
        city: 'Setapak',
        postcodes: [53300]
      }
    ]
  },
  {
    area: 'Wilayah Persekutuan (Labuan)',
    postcodes: [
      {
        city: 'Labuan',
        postcodes: [
          87000,
          87010,
          87011,
          87012,
          87013,
          87014,
          87015,
          87016,
          87017,
          87018,
          87019,
          87020,
          87021,
          87022,
          87023,
          87024,
          87025,
          87026,
          87027,
          87028,
          87029,
          87030,
          87031,
          87032,
          87033
        ]
      }
    ]
  },
  {
    area: 'Wilayah Persekutuan (Putrajaya)',
    postcodes: [
      {
        city: 'Putrajaya',
        postcodes: [
          62000,
          62007,
          62050,
          62100,
          62150,
          62200,
          62250,
          62300,
          62502,
          62504,
          62505,
          62506,
          62510,
          62512,
          62514,
          62516,
          62517,
          62518,
          62519,
          62520,
          62522,
          62524,
          62526,
          62527,
          62530,
          62532,
          62536,
          62540,
          62542,
          62546,
          62550,
          62551,
          62570,
          62574,
          62576,
          62582,
          62584,
          62590,
          62592,
          62594,
          62596,
          62602,
          62604,
          62605,
          62606,
          62616,
          62618,
          62620,
          62623,
          62624,
          62628,
          62630,
          62632,
          62648,
          62652,
          62654,
          62662,
          62668,
          62670,
          62674,
          62675,
          62676,
          62677,
          62686,
          62692,
          62988
        ]
      }
    ]
  },
  {
    area: 'Johor',
    postcodes: [
      {
        city: 'Ayer Baloi',
        postcodes: [82100]
      },
      {
        city: 'Ayer Hitam',
        postcodes: [86100]
      },
      {
        city: 'Ayer Tawar',
        postcodes: [281920, 381920, 481920, 581920]
      },
      {
        city: 'Bandar Penawar',
        postcodes: [81930]
      },
      {
        city: 'Bandar Tenggara',
        postcodes: [81440]
      },
      {
        city: 'Batu Anam',
        postcodes: [85100]
      },
      {
        city: 'Batu Pahat',
        postcodes: [83000]
      },
      {
        city: 'Bekok',
        postcodes: [86500]
      },
      {
        city: 'Benut',
        postcodes: [82200]
      },
      {
        city: 'Bukit Gambir',
        postcodes: [84800]
      },
      {
        city: 'Bukit Pasir',
        postcodes: [84300]
      },
      {
        city: 'Chaah',
        postcodes: [85400]
      },
      {
        city: 'Endau',
        postcodes: [86900]
      },
      {
        city: 'Gelang Patah',
        postcodes: [81550]
      },
      {
        city: 'Gerisek',
        postcodes: [84700]
      },
      {
        city: 'Gugusan Taib Andak',
        postcodes: [81450]
      },
      {
        city: 'Jementah',
        postcodes: [85200]
      },
      {
        city: 'Johor Bahru',
        postcodes: [
          80000,
          80050,
          80100,
          80150,
          80200,
          80250,
          80300,
          80350,
          80400,
          80500,
          80506,
          80508,
          80516,
          80519,
          80534,
          80536,
          80542,
          80546,
          80558,
          80560,
          80564,
          80568,
          80578,
          80584,
          80586,
          80590,
          80592,
          80594,
          80596,
          80600,
          80604,
          80608,
          80620,
          80622,
          80628,
          80644,
          80648,
          80662,
          80664,
          80668,
          80670,
          80672,
          80673,
          80676,
          80700,
          80710,
          80720,
          80730,
          80900,
          80902,
          80904,
          80906,
          80908,
          80988,
          80990,
          81000,
          81100,
          81200,
          81300,
          81310
        ]
      },
      {
        city: 'Kahang',
        postcodes: [86700]
      },
      {
        city: 'Kluang',
        postcodes: [86000, 86300]
      },
      {
        city: 'Kota Tinggi',
        postcodes: [81900]
      },
      {
        city: 'Kukup',
        postcodes: [82300]
      },
      {
        city: 'Kulai',
        postcodes: [81000]
      },
      {
        city: 'Labis',
        postcodes: [85300]
      },
      {
        city: 'Layang-Layang',
        postcodes: [81850]
      },
      {
        city: 'Masai',
        postcodes: [81750, 81750]
      },
      {
        city: 'Mersing',
        postcodes: [86800, 86810]
      },
      {
        city: 'Muar',
        postcodes: [84000, 84200]
      },
      {
        city: 'Nusajaya',
        postcodes: [
          79000,
          79100,
          79150,
          79200,
          79250,
          79502,
          79503,
          79504,
          79505,
          79511,
          79513,
          79514,
          79517,
          79518,
          79520,
          79521,
          79523,
          79532,
          79538,
          79540,
          79546,
          79548,
          79550,
          79552,
          79555,
          79570,
          79575,
          79576,
          79592,
          79601,
          79603,
          79605,
          79606,
          79612,
          79626,
          79630,
          79632,
          79646,
          79658,
          79660,
          79680,
          79681,
          79683
        ]
      },
      {
        city: 'Pagoh',
        postcodes: [84600]
      },
      {
        city: 'Paloh',
        postcodes: [86600]
      },
      {
        city: 'Panchor',
        postcodes: [84500]
      },
      {
        city: 'Parit Jawa',
        postcodes: [84150]
      },
      {
        city: 'Parit Raja',
        postcodes: [86400]
      },
      {
        city: 'Parit Sulong',
        postcodes: [83500]
      },
      {
        city: 'Pasir Gudang',
        postcodes: [81700]
      },
      {
        city: 'Pekan Nenas',
        postcodes: [81500]
      },
      {
        city: 'Pengerang',
        postcodes: [81600]
      },
      {
        city: 'Pontian',
        postcodes: [82000]
      },
      {
        city: 'Rengam',
        postcodes: [86300]
      },
      {
        city: 'Rengit',
        postcodes: [83100]
      },
      {
        city: 'Segamat',
        postcodes: [85000]
      },
      {
        city: 'Semerah',
        postcodes: [83600]
      },
      {
        city: 'Senai',
        postcodes: [81400]
      },
      {
        city: 'Senggarang',
        postcodes: [83200]
      },
      {
        city: 'Seri Gading',
        postcodes: [83300]
      },
      {
        city: 'Seri Medan',
        postcodes: [83400]
      },
      {
        city: 'Simpang Rengam',
        postcodes: [86200]
      },
      {
        city: 'Sri Gading',
        postcodes: [83300]
      },
      {
        city: 'Sri Medan',
        postcodes: [83400]
      },
      {
        city: 'Sungai Mati',
        postcodes: [81500, 84400]
      },
      {
        city: 'Tangkak',
        postcodes: [84000, 84900]
      },
      {
        city: 'Ulu Tiram',
        postcodes: [81800]
      },
      {
        city: 'Yong Peng',
        postcodes: [83700]
      }
    ]
  },
  {
    area: 'Kedah',
    postcodes: [
      {
        city: 'Alor Setar',
        postcodes: [
          '05000',
          '05050',
          '05100',
          '05150',
          '05200',
          '05250',
          '05300',
          '05350',
          '05400',
          '05460',
          '05500',
          '05502',
          '05503',
          '05504',
          '05505',
          '05506',
          '05508',
          '05512',
          '05514',
          '05516',
          '05517',
          '05518',
          '05520',
          '05532',
          '05534',
          '05536',
          '05538',
          '05550',
          '05551',
          '05552',
          '05556',
          '05558',
          '05560',
          '05564',
          '05576',
          '05578',
          '05580',
          '05582',
          '05586',
          '05590',
          '05592',
          '05594',
          '05600',
          '05604',
          '05610',
          '05612',
          '05614',
          '05620',
          '05621',
          '05622',
          '05626',
          '05628',
          '05630',
          '05632',
          '05644',
          '05660',
          '05661',
          '05664',
          '05670',
          '05672',
          '05673',
          '05674',
          '05675',
          '05676',
          '05680',
          '05690',
          '05696',
          '05700',
          '05710',
          '05720',
          '05990',
          '06250',
          '06550',
          '06570',
          '06660'
        ]
      },
      {
        city: 'Alor Star',
        postcodes: ['05150', '05350', '05400', '05460', '06250', '06550']
      },
      {
        city: 'Ayer Hitam',
        postcodes: ['06150']
      },
      {
        city: 'Baling',
        postcodes: ['09100']
      },
      {
        city: 'Bandar Baharu',
        postcodes: [34950]
      },
      {
        city: 'Bandar Bahru',
        postcodes: [14290, 14390]
      },
      {
        city: 'Bedong',
        postcodes: ['08100', '08110']
      },
      {
        city: 'Bukit Kayu Hitam',
        postcodes: ['06050']
      },
      {
        city: 'Changloon',
        postcodes: ['06010']
      },
      {
        city: 'Gurun',
        postcodes: ['08300', '08330', '08800']
      },
      {
        city: 'Jeniang',
        postcodes: ['08320', '08700']
      },
      {
        city: 'Jitra',
        postcodes: ['06000', '06007', '06009']
      },
      {
        city: 'Karangan',
        postcodes: ['09700']
      },
      {
        city: 'Kepala Batas',
        postcodes: ['06200', '06207', '06209']
      },
      {
        city: 'Kodiang',
        postcodes: ['06100']
      },
      {
        city: 'Kota Kuala Muda',
        postcodes: ['08500', '08507', '08509']
      },
      {
        city: 'Kota Sarang Semut',
        postcodes: ['06800']
      },
      {
        city: 'Kuala Kedah',
        postcodes: ['06600']
      },
      {
        city: 'Kuala Ketil',
        postcodes: ['09300', '09310']
      },
      {
        city: 'Kuala Nerang',
        postcodes: ['06300']
      },
      {
        city: 'Kuala Pegang',
        postcodes: ['09110']
      },
      {
        city: 'Kulim',
        postcodes: ['09000', '09007', '09009', '09010', '09020']
      },
      {
        city: 'Kupang',
        postcodes: ['09200']
      },
      {
        city: 'Langgar',
        postcodes: ['06500', '06507', '06509']
      },
      {
        city: 'Langkawi',
        postcodes: ['07000', '07007', '07009']
      },
      {
        city: 'Lunas',
        postcodes: ['09600']
      },
      {
        city: 'Merbok',
        postcodes: ['08400', '08407', '08409']
      },
      {
        city: 'Padang Serai',
        postcodes: ['09400', '09410']
      },
      {
        city: 'Pendang',
        postcodes: [
          '06400',
          '06700',
          '06707',
          '06709',
          '06710',
          '06720',
          '06750'
        ]
      },
      {
        city: 'Pokok Sena',
        postcodes: ['06350', '06400']
      },
      {
        city: 'Serdang',
        postcodes: ['09800', '09810']
      },
      {
        city: 'Sik',
        postcodes: ['08200', '08210', '08340']
      },
      {
        city: 'Simpang Empat',
        postcodes: ['06650']
      },
      {
        city: 'Sungai Petani',
        postcodes: ['08000', '08007', '08009', '08010', '08600']
      },
      {
        city: 'Universiti Utara Malaysia',
        postcodes: ['06010']
      },
      {
        city: 'Yan',
        postcodes: ['06900', '06910']
      }
    ]
  },
  {
    area: 'Kelantan',
    postcodes: [
      {
        city: 'Ayer Lanas',
        postcodes: [17700]
      },
      {
        city: 'Bachok',
        postcodes: [
          16020,
          16030,
          16050,
          16060,
          16070,
          16090,
          16300,
          16310,
          16320
        ]
      },
      {
        city: 'Cherang Ruku',
        postcodes: [16700]
      },
      {
        city: 'Dabong',
        postcodes: [18200]
      },
      {
        city: 'Gua Musang',
        postcodes: [18300]
      },
      {
        city: 'Jeli',
        postcodes: [17600]
      },
      {
        city: 'Kem Desa Pahlawan',
        postcodes: [16500]
      },
      {
        city: 'Ketereh',
        postcodes: [16450]
      },
      {
        city: 'Kota Bahru',
        postcodes: [16100]
      },
      {
        city: 'Kota Bharu',
        postcodes: [
          15000,
          15050,
          15100,
          15150,
          15159,
          15200,
          15300,
          15350,
          15400,
          15500,
          15502,
          15503,
          15504,
          15505,
          15506,
          15508,
          15512,
          15514,
          15516,
          15517,
          15518,
          15519,
          15520,
          15524,
          15529,
          15532,
          15534,
          15536,
          15538,
          15540,
          15546,
          15548,
          15550,
          15551,
          15556,
          15558,
          15560,
          15564,
          15570,
          15572,
          15576,
          15578,
          15582,
          15586,
          15590,
          15592,
          15594,
          15596,
          15600,
          15604,
          15608,
          15609,
          15612,
          15614,
          15616,
          15622,
          15623,
          15626,
          15628,
          15630,
          15632,
          15634,
          15644,
          15646,
          15648,
          15658,
          15660,
          15661,
          15664,
          15670,
          15672,
          15673,
          15674,
          15676,
          15680,
          15690,
          15710,
          15720,
          15730,
          15740,
          15988,
          15990,
          16010,
          16020,
          16100,
          16109,
          16150
        ]
      },
      {
        city: 'Kuala Balah',
        postcodes: [17610]
      },
      {
        city: 'Kuala Krai',
        postcodes: [18000, 18050]
      },
      {
        city: 'Machang',
        postcodes: [18500]
      },
      {
        city: 'Melor',
        postcodes: [16400]
      },
      {
        city: 'Pasir Mas',
        postcodes: [
          17000,
          17007,
          17009,
          17010,
          17020,
          17030,
          17040,
          17050,
          17060,
          17070
        ]
      },
      {
        city: 'Pasir Puteh',
        postcodes: [16800]
      },
      {
        city: 'Pulai Chondong',
        postcodes: [16600]
      },
      {
        city: 'Rantau Panjang',
        postcodes: [17200]
      },
      {
        city: 'Selising',
        postcodes: [16810]
      },
      {
        city: 'Tanah Merah',
        postcodes: [17500, 17507, 17509, 17510]
      },
      {
        city: 'Temangan',
        postcodes: [18400]
      },
      {
        city: 'Tumpat',
        postcodes: [16080, 16200, 16210]
      },
      {
        city: 'Wakaf Bharu',
        postcodes: [16040, 16250]
      }
    ]
  },
  {
    area: 'Melaka',
    postcodes: [
      {
        city: 'Air Keroh',
        postcodes: [75450]
      },
      {
        city: 'Alor Gajah',
        postcodes: [78000, 78009]
      },
      {
        city: 'Asahan',
        postcodes: [77100, 77109]
      },
      {
        city: 'Ayer Keroh',
        postcodes: [75450]
      },
      {
        city: 'Bemban',
        postcodes: [77200]
      },
      {
        city: 'Durian Tunggal',
        postcodes: [76100, 76109]
      },
      {
        city: 'Jasin',
        postcodes: [77000, 77007, 77008, 77009, 77200]
      },
      {
        city: 'Kem Trendak',
        postcodes: [76200]
      },
      {
        city: 'Kuala Sungai Baru',
        postcodes: [78200]
      },
      {
        city: 'Lubok China',
        postcodes: [78100]
      },
      {
        city: 'Masjid Tanah',
        postcodes: [78300, 78307, 78309]
      },
      {
        city: 'Melaka',
        postcodes: [
          75000,
          75050,
          75100,
          75150,
          75200,
          75250,
          75260,
          75300,
          75350,
          75400,
          75450,
          75460,
          75500,
          75502,
          75503,
          75504,
          75505,
          75506,
          75508,
          75510,
          75512,
          75514,
          75516,
          75517,
          75518,
          75519,
          75532,
          75536,
          75538,
          75540,
          75542,
          75546,
          75550,
          75551,
          75552,
          75560,
          75564,
          75566,
          75570,
          75572,
          75576,
          75578,
          75582,
          75584,
          75586,
          75590,
          75592,
          75594,
          75596,
          75600,
          75604,
          75606,
          75608,
          75609,
          75610,
          75612,
          75618,
          75620,
          75622,
          75626,
          75628,
          75630,
          75632,
          75646,
          75648,
          75662,
          75670,
          75672,
          75673,
          75674,
          75676,
          75690,
          75700,
          75710,
          75720,
          75730,
          75740,
          75750,
          75760,
          75900,
          75902,
          75904,
          75906,
          75908,
          75910,
          75912,
          75914,
          75916,
          75918,
          75990,
          76400,
          76450
        ]
      },
      {
        city: 'Merlimau',
        postcodes: [77300, 77309]
      },
      {
        city: 'Selandar',
        postcodes: [77500]
      },
      {
        city: 'Sungai Rambai',
        postcodes: [77400, 77409]
      },
      {
        city: "Sungai Rambai'",
        postcodes: [77400]
      },
      {
        city: 'Sungai Udang',
        postcodes: [76300]
      },
      {
        city: 'Tanjong Kling',
        postcodes: [76400, 76409]
      }
    ]
  },
  {
    area: 'Pahang',
    postcodes: [
      {
        city: 'Balok',
        postcodes: [26080, 26100, 26150, 26190]
      },
      {
        city: 'Bandar Bera',
        postcodes: [28200]
      },
      {
        city: 'Bandar Pusat Jengka',
        postcodes: [
          26400,
          26400,
          26410,
          26420,
          26430,
          26430,
          26440,
          26450,
          26460,
          26485,
          26490,
          26500
        ]
      },
      {
        city: 'Bandar Tun Abdul Razak',
        postcodes: [26900]
      },
      {
        city: 'Benta',
        postcodes: [27300, 27310]
      },
      {
        city: 'Bentong',
        postcodes: [28700, 28707, 28709, 28730, 28740, 28750]
      },
      {
        city: 'Brinchang',
        postcodes: [39100]
      },
      {
        city: 'Bukit Fraser',
        postcodes: [49000]
      },
      {
        city: 'Bukit Goh',
        postcodes: [26050, 26090]
      },
      {
        city: 'Chenor',
        postcodes: [28100]
      },
      {
        city: 'Chini',
        postcodes: [26690]
      },
      {
        city: 'Damak',
        postcodes: [27030]
      },
      {
        city: 'Dong',
        postcodes: [27400]
      },
      {
        city: 'Gambang',
        postcodes: [26300, 26310, 26320, 26330, 26340, 26350, 26360, 26370]
      },
      {
        city: 'Genting Highlands',
        postcodes: [69000]
      },
      {
        city: 'Jaya Gading',
        postcodes: [26250]
      },
      {
        city: 'Jerantut',
        postcodes: [
          27000,
          27010,
          27020,
          27040,
          27050,
          27060,
          27070,
          27090,
          27150
        ]
      },
      {
        city: 'Karak',
        postcodes: [28600, 28610, 28620]
      },
      {
        city: 'Kemayan',
        postcodes: [28340, 28380]
      },
      {
        city: 'Kuala Krau',
        postcodes: [28050]
      },
      {
        city: 'Kuala Lipis',
        postcodes: [27200, 27207, 27209, 27210]
      },
      {
        city: 'Kuala Rompin',
        postcodes: [26800, 26810, 26820]
      },
      {
        city: 'Kuantan',
        postcodes: [
          25000,
          25050,
          25100,
          25150,
          25200,
          25250,
          25300,
          25350,
          25500,
          25502,
          25503,
          25504,
          25505,
          25506,
          25508,
          25509,
          25512,
          25514,
          25516,
          25517,
          25518,
          25520,
          25524,
          25529,
          25532,
          25534,
          25536,
          25538,
          25540,
          25546,
          25548,
          25550,
          25551,
          25552,
          25556,
          25558,
          25560,
          25564,
          25570,
          25576,
          25578,
          25582,
          25584,
          25586,
          25590,
          25592,
          25594,
          25596,
          25598,
          25600,
          25604,
          25606,
          25608,
          25609,
          25610,
          25612,
          25614,
          25620,
          25622,
          25626,
          25628,
          25630,
          25632,
          25644,
          25646,
          25648,
          25656,
          25660,
          25661,
          25662,
          25670,
          25672,
          25673,
          25674,
          25676,
          25690,
          25700,
          25710,
          25720,
          25730,
          25740,
          25750,
          25990,
          26010,
          26040,
          26060,
          26070,
          26080,
          26100,
          26140,
          26170,
          26180
        ]
      },
      {
        city: 'Lanchang',
        postcodes: [28500]
      },
      {
        city: 'Lurah Bilut',
        postcodes: [28800]
      },
      {
        city: 'Maran',
        postcodes: [26500]
      },
      {
        city: 'Mentakab',
        postcodes: [28400, 28407, 28409]
      },
      {
        city: 'Muadzam Shah',
        postcodes: [26700]
      },
      {
        city: 'Padang Tengku',
        postcodes: [27100]
      },
      {
        city: 'Pekan',
        postcodes: [
          26600,
          26607,
          26609,
          26610,
          26620,
          26630,
          26640,
          26650,
          26660,
          26680
        ]
      },
      {
        city: 'Raub',
        postcodes: [27600, 27607, 27609, 27610, 27620, 27630, 27670]
      },
      {
        city: 'Ringlet',
        postcodes: [39200]
      },
      {
        city: 'Sega',
        postcodes: [27660]
      },
      {
        city: 'Sungai Koyan',
        postcodes: [27650]
      },
      {
        city: 'Sungai Lembing',
        postcodes: [26200]
      },
      {
        city: 'Sungai Ruan',
        postcodes: [27630]
      },
      {
        city: 'Tanah Rata',
        postcodes: [39000, 39007, 39009, 39010]
      },
      {
        city: 'Temerloh',
        postcodes: [28000, 28007, 28009, 28010, 28020, 28030, 28040]
      },
      {
        city: 'Triang',
        postcodes: [28200, 28300, 28310, 28320, 28330]
      }
    ]
  },
  {
    area: 'Penang',
    postcodes: [
      {
        city: 'Ayer Itam',
        postcodes: [11500]
      },
      {
        city: 'Balik Pulau',
        postcodes: [11000, 11010, 11020]
      },
      {
        city: 'Batu Ferringhi',
        postcodes: [11100]
      },
      {
        city: 'Batu Maung',
        postcodes: [11900, 11960]
      },
      {
        city: 'Bayan Lepas',
        postcodes: [11900, 11910, 11920, 11950]
      },
      {
        city: 'Bukit Mertajam',
        postcodes: [14000, 14007, 14009, 14020]
      },
      {
        city: 'Butterworth',
        postcodes: [
          12000,
          12100,
          12200,
          12300,
          12700,
          12710,
          12720,
          12990,
          13000,
          13009,
          13020,
          13050,
          13400,
          13409,
          13800
        ]
      },
      {
        city: 'Gelugor',
        postcodes: [11700]
      },
      {
        city: 'Jelutong',
        postcodes: [11600, 11609]
      },
      {
        city: 'Kepala Batas',
        postcodes: [13200, 13210, 13220]
      },
      {
        city: 'Kubang Semang',
        postcodes: [14400]
      },
      {
        city: 'Nibong Tebal',
        postcodes: [14300, 14310, 14320]
      },
      {
        city: 'Penaga',
        postcodes: [13100, 13110]
      },
      {
        city: 'Penang Hill',
        postcodes: [11300]
      },
      {
        city: 'Perai',
        postcodes: [13600, 13700]
      },
      {
        city: 'Permatang Pauh',
        postcodes: [13500]
      },
      {
        city: 'Pulau Pinang',
        postcodes: [
          10000,
          10050,
          10100,
          10150,
          10200,
          10250,
          10300,
          10350,
          10400,
          10450,
          10460,
          10470,
          10500,
          10502,
          10503,
          10504,
          10505,
          10506,
          10508,
          10512,
          10514,
          10516,
          10518,
          10524,
          10534,
          10538,
          10540,
          10542,
          10546,
          10550,
          10551,
          10552,
          10558,
          10560,
          10564,
          10566,
          10570,
          10576,
          10578,
          10582,
          10590,
          10592,
          10593,
          10594,
          10596,
          10600,
          10604,
          10609,
          10610,
          10612,
          10620,
          10622,
          10626,
          10628,
          10634,
          10646,
          10648,
          10660,
          10661,
          10662,
          10670,
          10672,
          10673,
          10674,
          10676,
          10690,
          10710,
          10720,
          10730,
          10740,
          10750,
          10760,
          10770,
          10780,
          10790,
          10800,
          10810,
          10820,
          10830,
          10840,
          10850,
          10910,
          10920,
          10990,
          11050,
          11060,
          11400,
          11409
        ]
      },
      {
        city: 'Simpang Ampat',
        postcodes: [14100, 14101, 14110, 14120, 14200]
      },
      {
        city: 'Sungai Jawi',
        postcodes: [14200]
      },
      {
        city: 'Tanjong Bungah',
        postcodes: [11200]
      },
      {
        city: 'Tasek Gelugor',
        postcodes: [13300, 13310]
      },
      {
        city: 'Usm Pulau Pinang',
        postcodes: [11800]
      }
    ]
  },
  {
    area: 'Perak',
    postcodes: [
      {
        city: 'Ayer Tawar',
        postcodes: [32400]
      },
      {
        city: 'Bagan Datoh',
        postcodes: [36100]
      },
      {
        city: 'Bagan Serai',
        postcodes: [34300, 34310]
      },
      {
        city: 'Bandar Seri Iskandar',
        postcodes: [32600, 32610]
      },
      {
        city: 'Batu Gajah',
        postcodes: [31000, 31007, 31009]
      },
      {
        city: 'Batu Kurau',
        postcodes: [34500, 34510, 34520]
      },
      {
        city: 'Behrang Stesen',
        postcodes: [35950]
      },
      {
        city: 'Bidor',
        postcodes: [35500]
      },
      {
        city: 'Bota',
        postcodes: [32600]
      },
      {
        city: 'Bruas',
        postcodes: [32700]
      },
      {
        city: 'Changkat Jering',
        postcodes: [34850]
      },
      {
        city: 'Changkat Keruing',
        postcodes: [32500]
      },
      {
        city: 'Chemor',
        postcodes: [31200]
      },
      {
        city: 'Chenderiang',
        postcodes: [35300]
      },
      {
        city: 'Chenderong Balai',
        postcodes: [36600]
      },
      {
        city: 'Chikus',
        postcodes: [36750]
      },
      {
        city: 'Enggor',
        postcodes: [33600]
      },
      {
        city: 'Gerik',
        postcodes: [33300, 33310, 33320]
      },
      {
        city: 'Gopeng',
        postcodes: [31600, 31610]
      },
      {
        city: 'Hutan Melintang',
        postcodes: [36400]
      },
      {
        city: 'Intan',
        postcodes: [33200]
      },
      {
        city: 'Ipoh',
        postcodes: [
          30000,
          30010,
          30020,
          30100,
          30200,
          30250,
          30300,
          30350,
          30450,
          30500,
          30502,
          30503,
          30504,
          30505,
          30506,
          30508,
          30510,
          30512,
          30516,
          30517,
          30518,
          30519,
          30520,
          30524,
          30532,
          30534,
          30536,
          30540,
          30542,
          30546,
          30548,
          30550,
          30551,
          30552,
          30554,
          30556,
          30560,
          30564,
          30570,
          30576,
          30580,
          30582,
          30586,
          30590,
          30592,
          30594,
          30596,
          30600,
          30604,
          30606,
          30609,
          30610,
          30612,
          30614,
          30620,
          30621,
          30622,
          30626,
          30628,
          30630,
          30632,
          30634,
          30644,
          30646,
          30648,
          30656,
          30658,
          30660,
          30661,
          30662,
          30664,
          30668,
          30670,
          30673,
          30674,
          30676,
          30682,
          30690,
          30700,
          30710,
          30720,
          30730,
          30740,
          30750,
          30760,
          30770,
          30780,
          30790,
          30800,
          30810,
          30820,
          30830,
          30840,
          30900,
          30902,
          30904,
          30906,
          30908,
          30910,
          30912,
          30988,
          30990,
          31350,
          31400,
          31407,
          31409,
          31450,
          31500,
          31650
        ]
      },
      {
        city: 'Jeram',
        postcodes: [31850]
      },
      {
        city: 'Kampar',
        postcodes: [31900, 31907, 31909, 31910, 31920]
      },
      {
        city: 'Kampung Gajah',
        postcodes: [36800, 36810]
      },
      {
        city: 'Kampung Kepayang',
        postcodes: [31300]
      },
      {
        city: 'Kamunting',
        postcodes: [34600]
      },
      {
        city: 'Kuala Kangsar',
        postcodes: [33000, 33007, 33009, 33010, 33020, 33030, 33040]
      },
      {
        city: 'Kuala Kurau',
        postcodes: [34350]
      },
      {
        city: 'Kuala Sepetang',
        postcodes: [34650]
      },
      {
        city: 'Lambor Kanan',
        postcodes: [32900]
      },
      {
        city: 'Langkap',
        postcodes: [36700]
      },
      {
        city: 'Lenggong',
        postcodes: [33400, 33410, 33420]
      },
      {
        city: 'Lumut',
        postcodes: [32200]
      },
      {
        city: 'Malim Nawar',
        postcodes: [31700]
      },
      {
        city: 'Mambang Di Awan',
        postcodes: [31900, 31920, 31950]
      },
      {
        city: 'Manong',
        postcodes: [33800]
      },
      {
        city: 'Matang',
        postcodes: [34750]
      },
      {
        city: 'Padang Rengas',
        postcodes: [33700]
      },
      {
        city: 'Pangkor',
        postcodes: [32300]
      },
      {
        city: 'Pantai Remis',
        postcodes: [34900]
      },
      {
        city: 'Parit',
        postcodes: [32800]
      },
      {
        city: 'Parit Buntar',
        postcodes: [34200]
      },
      {
        city: 'Pengkalan Hulu',
        postcodes: [33100]
      },
      {
        city: 'Pusing',
        postcodes: [31550, 31560]
      },
      {
        city: 'Rantau Panjang',
        postcodes: [34140]
      },
      {
        city: 'Sauk',
        postcodes: [33500]
      },
      {
        city: 'Selama',
        postcodes: [34100, 34120, 34130]
      },
      {
        city: 'Selekoh',
        postcodes: [36200, 36207, 36209]
      },
      {
        city: 'Seri Manjong',
        postcodes: [32040]
      },
      {
        city: 'Simpang',
        postcodes: [34700]
      },
      {
        city: 'Simpang Ampat Semanggol',
        postcodes: [34400]
      },
      {
        city: 'Sitiawan',
        postcodes: [32000]
      },
      {
        city: 'Slim River',
        postcodes: [35800, 35820]
      },
      {
        city: 'Sungai Siput',
        postcodes: [31050, 31100]
      },
      {
        city: 'Sungai Sumun',
        postcodes: [36300, 36307, 36309]
      },
      {
        city: 'Sungkai',
        postcodes: [35600]
      },
      {
        city: 'Taiping',
        postcodes: [34000, 34007, 34008, 34009, 34010, 34020, 34030]
      },
      {
        city: 'Tanah Rata',
        postcodes: [39000]
      },
      {
        city: 'Tanjong Malim',
        postcodes: [35900, 35907, 35909, 35910]
      },
      {
        city: 'Tanjong Piandang',
        postcodes: [34250]
      },
      {
        city: 'Tanjong Rambutan',
        postcodes: [31250]
      },
      {
        city: 'Tanjong Tualang',
        postcodes: [31800]
      },
      {
        city: 'Tapah',
        postcodes: [35000, 35007, 35009]
      },
      {
        city: 'Tapah Road',
        postcodes: [35400]
      },
      {
        city: 'Teluk Intan',
        postcodes: [36000, 36007, 36008, 36009, 36010, 36020, 36030, 36110]
      },
      {
        city: 'Temoh',
        postcodes: [35350]
      },
      {
        city: 'Tldm Lumut',
        postcodes: [32100]
      },
      {
        city: 'Trolak',
        postcodes: [35700]
      },
      {
        city: 'Trong',
        postcodes: [34800]
      },
      {
        city: 'Tronoh',
        postcodes: [31750]
      },
      {
        city: 'Ulu Bernam',
        postcodes: [36500]
      },
      {
        city: 'Ulu Kinta',
        postcodes: [31150]
      }
    ]
  },
  {
    area: 'Perlis',
    postcodes: [
      {
        city: 'Arau',
        postcodes: ['02600', '02607', '02609']
      },
      {
        city: 'Kaki Bukit',
        postcodes: ['02200']
      },
      {
        city: 'Kangar',
        postcodes: [
          '01000',
          '01007',
          '01009',
          '01500',
          '01502',
          '01503',
          '01504',
          '01505',
          '01506',
          '01508',
          '01512',
          '01514',
          '01516',
          '01517',
          '01518',
          '01524',
          '01529',
          '01532',
          '01538',
          '01540',
          '01546',
          '01550',
          '01551',
          '01556',
          '01560',
          '01564',
          '01570',
          '01572',
          '01576',
          '01578',
          '01582',
          '01586',
          '01590',
          '01592',
          '01594',
          '01596',
          '01598',
          '01600',
          '01604',
          '01606',
          '01608',
          '01609',
          '01610',
          '01612',
          '01614',
          '01620',
          '01622',
          '01626',
          '01628',
          '01630',
          '01632',
          '01634',
          '01644',
          '01646',
          '01648',
          '01660',
          '01664',
          '01670',
          '01672',
          '01673',
          '01674',
          '01676',
          '01680',
          '01694',
          '02400',
          '02450',
          '02500'
        ]
      },
      {
        city: 'Kuala Perlis',
        postcodes: ['02000']
      },
      {
        city: 'Padang Besar',
        postcodes: ['02100']
      },
      {
        city: 'Simpang Ampat',
        postcodes: ['02700', '02707', '02709', '02800']
      }
    ]
  },
  {
    area: 'Sabah',
    postcodes: [
      {
        city: 'Beaufort',
        postcodes: [89800, 89807, 89808, 89809]
      },
      {
        city: 'Beluran',
        postcodes: [90100, 90107, 90109]
      },
      {
        city: 'Beverly',
        postcodes: [88700, 89260]
      },
      {
        city: 'Bongawan',
        postcodes: [89700, 89707, 89708, 89709]
      },
      {
        city: 'Inanam',
        postcodes: [88857]
      },
      {
        city: 'Keningau',
        postcodes: [89000, 89007, 89008, 89009]
      },
      {
        city: 'Kota Belud',
        postcodes: [89150, 89157, 89158, 89159]
      },
      {
        city: 'Kota Kinabalu',
        postcodes: [
          88000,
          88100,
          88200,
          88300,
          88400,
          88450,
          88460,
          88500,
          88502,
          88504,
          88505,
          88506,
          88508,
          88510,
          88512,
          88514,
          88516,
          88518,
          88520,
          88526,
          88527,
          88532,
          88534,
          88538,
          88540,
          88546,
          88550,
          88551,
          88552,
          88554,
          88556,
          88558,
          88560,
          88562,
          88564,
          88566,
          88568,
          88570,
          88572,
          88576,
          88580,
          88582,
          88586,
          88590,
          88592,
          88594,
          88596,
          88598,
          88600,
          88602,
          88604,
          88606,
          88608,
          88609,
          88610,
          88612,
          88614,
          88617,
          88618,
          88620,
          88621,
          88622,
          88624,
          88626,
          88628,
          88630,
          88632,
          88634,
          88644,
          88646,
          88648,
          88656,
          88658,
          88660,
          88661,
          88662,
          88670,
          88672,
          88673,
          88675,
          88676,
          88680,
          88690,
          88757,
          88758,
          88759,
          88760,
          88761,
          88762,
          88763,
          88764,
          88765,
          88766,
          88767,
          88768,
          88769,
          88770,
          88771,
          88772,
          88773,
          88774,
          88775,
          88776,
          88777,
          88778,
          88779,
          88780,
          88781,
          88782,
          88783,
          88784,
          88785,
          88786,
          88787,
          88788,
          88789,
          88790,
          88800,
          88801,
          88802,
          88803,
          88804,
          88805,
          88806,
          88807,
          88808,
          88809,
          88810,
          88811,
          88812,
          88813,
          88814,
          88815,
          88816,
          88817,
          88818,
          88819,
          88820,
          88821,
          88822,
          88823,
          88824,
          88825,
          88826,
          88827,
          88828,
          88829,
          88830,
          88831,
          88832,
          88833,
          88834,
          88835,
          88836,
          88837,
          88838,
          88839,
          88840,
          88841,
          88842,
          88843,
          88844,
          88845,
          88846,
          88847,
          88848,
          88849,
          88850,
          88851,
          88852,
          88853,
          88854,
          88855,
          88860,
          88861,
          88862,
          88863,
          88865,
          88866,
          88867,
          88868,
          88869,
          88870,
          88871,
          88872,
          88873,
          88874,
          88875,
          88900,
          88901,
          88902,
          88903,
          88904,
          88905,
          88906,
          88988,
          88990,
          88991,
          88992,
          88993,
          88994,
          88995,
          88996,
          88997,
          88998,
          88999
        ]
      },
      {
        city: 'Kota Kinabatangan',
        postcodes: [90200]
      },
      {
        city: 'Kota Marudu',
        postcodes: [89100, 89107, 89108, 89109]
      },
      {
        city: 'Kuala Penyu',
        postcodes: [89740, 89747, 89748, 89749]
      },
      {
        city: 'Kudat',
        postcodes: [89050, 89057, 89058, 89059]
      },
      {
        city: 'Kunak',
        postcodes: [91200, 91207, 91209]
      },
      {
        city: 'Lahad Datu',
        postcodes: [
          91100,
          91109,
          91110,
          91111,
          91112,
          91113,
          91114,
          91115,
          91116,
          91117,
          91118,
          91119,
          91120,
          91121,
          91122,
          91123,
          91124,
          91125,
          91126,
          91127,
          91128,
          91150
        ]
      },
      {
        city: 'Likas',
        postcodes: [88856]
      },
      {
        city: 'Membakut',
        postcodes: [89720, 89727, 89728, 89729]
      },
      {
        city: 'Menumbok',
        postcodes: [89760, 89767, 89768, 89769]
      },
      {
        city: 'Nabawan',
        postcodes: [89950, 89957, 89958, 89959]
      },
      {
        city: 'Pamol',
        postcodes: [90400]
      },
      {
        city: 'Papar',
        postcodes: [89600, 89607, 89608, 89609]
      },
      {
        city: 'Penampang',
        postcodes: [89500, 89507, 89508, 89509]
      },
      {
        city: 'Putatan',
        postcodes: [88721, 88722, 88723, 88724, 88725]
      },
      {
        city: 'Ranau',
        postcodes: [89300, 89307, 89308, 89309]
      },
      {
        city: 'Sandakan',
        postcodes: [
          90000,
          90009,
          90300,
          90307,
          90700,
          90701,
          90702,
          90703,
          90704,
          90705,
          90706,
          90707,
          90708,
          90709,
          90711,
          90712,
          90713,
          90714,
          90715,
          90716,
          90717,
          90718,
          90719,
          90720,
          90721,
          90722,
          90723,
          90724,
          90725,
          90726,
          90727,
          90728,
          90729,
          90730,
          90731,
          90732,
          90733,
          90734,
          90735,
          90736,
          90737,
          90738,
          90739,
          90740,
          90741
        ]
      },
      {
        city: 'Semporna',
        postcodes: [91300, 91307, 91308, 91309]
      },
      {
        city: 'Sipitang',
        postcodes: [89850, 89857, 89858, 89859]
      },
      {
        city: 'Tambunan',
        postcodes: [89650, 89657, 89658, 89659]
      },
      {
        city: 'Tamparuli',
        postcodes: [89250, 89257, 89258, 89259]
      },
      {
        city: 'Tanjung Aru',
        postcodes: [88858]
      },
      {
        city: 'Tawau',
        postcodes: [
          91000,
          91007,
          91008,
          91009,
          91010,
          91011,
          91012,
          91013,
          91014,
          91015,
          91016,
          91017,
          91018,
          91019,
          91020,
          91021,
          91022,
          91023,
          91024,
          91025,
          91026,
          91027,
          91028,
          91029,
          91030,
          91031,
          91032,
          91033,
          91034,
          91035
        ]
      },
      {
        city: 'Tenghilan',
        postcodes: [89260]
      },
      {
        city: 'Tenom',
        postcodes: [89900, 89907, 89908, 89909]
      },
      {
        city: 'Tuaran',
        postcodes: [89200, 89207, 89208, 89209]
      }
    ]
  },
  {
    area: 'Sarawak',
    postcodes: [
      {
        city: 'Asajaya',
        postcodes: [94600]
      },
      {
        city: 'Balingian',
        postcodes: [96350]
      },
      {
        city: 'Baram',
        postcodes: [98050, 98057, 98058, 98059]
      },
      {
        city: 'Bau',
        postcodes: [94000, 94007, 94009]
      },
      {
        city: 'Bekenu',
        postcodes: [98150, 98157, 98159]
      },
      {
        city: 'Belaga',
        postcodes: [96900]
      },
      {
        city: 'Belawai',
        postcodes: [96150]
      },
      {
        city: 'Betong',
        postcodes: [95700, 95707, 95709]
      },
      {
        city: 'Bintangor',
        postcodes: [96500, 96507, 96508, 96509]
      },
      {
        city: 'Bintulu',
        postcodes: [
          97000,
          97007,
          97008,
          97009,
          97010,
          97011,
          97012,
          97013,
          97014,
          97015,
          97300
        ]
      },
      {
        city: 'Dalat',
        postcodes: [96300, 96307, 96309]
      },
      {
        city: 'Daro',
        postcodes: [96200]
      },
      {
        city: 'Debak',
        postcodes: [95500]
      },
      {
        city: 'Engkilili',
        postcodes: [95800]
      },
      {
        city: 'Julau',
        postcodes: [96600]
      },
      {
        city: 'Kabong',
        postcodes: [94650]
      },
      {
        city: 'Kanowit',
        postcodes: [96700, 96707, 96709]
      },
      {
        city: 'Kapit',
        postcodes: [96800, 96807, 96809]
      },
      {
        city: 'Kota Samarahan',
        postcodes: [94300]
      },
      {
        city: 'Kuching',
        postcodes: [
          93000,
          93010,
          93050,
          93100,
          93150,
          93200,
          93250,
          93300,
          93350,
          93400,
          93450,
          93500,
          93502,
          93503,
          93504,
          93505,
          93506,
          93507,
          93508,
          93514,
          93516,
          93517,
          93518,
          93519,
          93520,
          93527,
          93529,
          93532,
          93540,
          93550,
          93551,
          93552,
          93554,
          93556,
          93558,
          93560,
          93564,
          93566,
          93570,
          93572,
          93576,
          93578,
          93582,
          93586,
          93590,
          93592,
          93594,
          93596,
          93600,
          93604,
          93606,
          93608,
          93609,
          93610,
          93612,
          93614,
          93618,
          93619,
          93620,
          93626,
          93628,
          93632,
          93634,
          93648,
          93658,
          93660,
          93661,
          93662,
          93670,
          93672,
          93677,
          93690,
          93694,
          93700,
          93702,
          93704,
          93706,
          93708,
          93710,
          93712,
          93714,
          93716,
          93718,
          93720,
          93722,
          93724,
          93726,
          93728,
          93730,
          93732,
          93734,
          93736,
          93738,
          93740,
          93742,
          93744,
          93746,
          93748,
          93750,
          93752,
          93754,
          93756,
          93758,
          93760,
          93762,
          93764,
          93900,
          93902,
          93904,
          93906,
          93908,
          93910,
          93912,
          93914,
          93916,
          93990
        ]
      },
      {
        city: 'Lawas',
        postcodes: [98850, 98857, 98859]
      },
      {
        city: 'Limbang',
        postcodes: [98700, 98707, 98708, 98709]
      },
      {
        city: 'Lingga',
        postcodes: [94900]
      },
      {
        city: 'Long Lama',
        postcodes: [98300]
      },
      {
        city: 'Lubok Antu',
        postcodes: [95900]
      },
      {
        city: 'Lundu',
        postcodes: [94500, 94507, 94509]
      },
      {
        city: 'Lutong',
        postcodes: [98100, 98107, 98109]
      },
      {
        city: 'Matu',
        postcodes: [96250]
      },
      {
        city: 'Miri',
        postcodes: [98000, 98007, 98008, 98009]
      },
      {
        city: 'Mukah',
        postcodes: [96400, 96410]
      },
      {
        city: 'Nanga Medamit',
        postcodes: [98750]
      },
      {
        city: 'Niah',
        postcodes: [98200]
      },
      {
        city: 'Pusa',
        postcodes: [94950]
      },
      {
        city: 'Roban',
        postcodes: [95300]
      },
      {
        city: 'Saratok',
        postcodes: [95400, 95407, 95409]
      },
      {
        city: 'Sarikei',
        postcodes: [96100, 96107, 96108, 96109]
      },
      {
        city: 'Sebauh',
        postcodes: [97100]
      },
      {
        city: 'Sebuyau',
        postcodes: [94850]
      },
      {
        city: 'Serian',
        postcodes: [94700, 94707, 94709, 94750, 94760]
      },
      {
        city: 'Sibu',
        postcodes: [96000, 96007, 96008, 96009]
      },
      {
        city: 'Siburan',
        postcodes: [94200]
      },
      {
        city: 'Simunjan',
        postcodes: [94800, 94807, 94809]
      },
      {
        city: 'Song',
        postcodes: [96850]
      },
      {
        city: 'Spaoh',
        postcodes: [95600]
      },
      {
        city: 'Sri Aman',
        postcodes: [95000, 95007, 95008, 95009]
      },
      {
        city: 'Sundar',
        postcodes: [98800]
      },
      {
        city: 'Tatau',
        postcodes: [97200]
      }
    ]
  },
  {
    area: 'Selangor',
    postcodes: [
      {
        city: 'Ampang',
        postcodes: [68000]
      },
      {
        city: 'Bandar Baru Bangi',
        postcodes: [43650]
      },
      {
        city: 'Bandar Puncak Alam',
        postcodes: [42300]
      },
      {
        city: 'Bangi',
        postcodes: [43600]
      },
      {
        city: 'Banting',
        postcodes: [42700]
      },
      {
        city: 'Batang Berjuntai',
        postcodes: [45600, 45607, 45609, 45620]
      },
      {
        city: 'Batang Kali',
        postcodes: [44300]
      },
      {
        city: 'Batu Arang',
        postcodes: [48100]
      },
      {
        city: 'Batu Caves',
        postcodes: [68100]
      },
      {
        city: 'Beranang',
        postcodes: [43700]
      },
      {
        city: 'Bukit Rotan',
        postcodes: [45700]
      },
      {
        city: 'Cheras',
        postcodes: [43200, 43207, 56000, 56100]
      },
      {
        city: 'Cyberjaya',
        postcodes: [63000, 63100, 63200, 63300]
      },
      {
        city: 'Dengkil',
        postcodes: [43800, 43807]
      },
      {
        city: 'Gombak',
        postcodes: [53100]
      },
      {
        city: 'Hulu Langat',
        postcodes: [43100]
      },
      {
        city: 'Jenjarom',
        postcodes: [42600, 42610]
      },
      {
        city: 'Jeram',
        postcodes: [45800]
      },
      {
        city: 'Jerantut',
        postcodes: [27000]
      },
      {
        city: 'Kajang',
        postcodes: [43000, 43007, 43009, 43558]
      },
      {
        city: 'Kapar',
        postcodes: [42200]
      },
      {
        city: 'Kerling',
        postcodes: [44100]
      },
      {
        city: 'Klang',
        postcodes: [
          41000,
          41050,
          41100,
          41150,
          41200,
          41250,
          41300,
          41400,
          41506,
          41560,
          41586,
          41672,
          41700,
          41710,
          41720,
          41900,
          41902,
          41904,
          41906,
          41908,
          41910,
          41912,
          41914,
          41916,
          41918,
          41990,
          42100
        ]
      },
      {
        city: 'Klia',
        postcodes: [64000]
      },
      {
        city: 'Kuala Kubu Baru',
        postcodes: [44000, 44010, 44020, 44110]
      },
      {
        city: 'Kuala Selangor',
        postcodes: [45000]
      },
      {
        city: 'Kuantan',
        postcodes: [26060]
      },
      {
        city: 'Pandan',
        postcodes: [55100]
      },
      {
        city: 'Pelabuhan Klang',
        postcodes: [42000, 42009, 42920]
      },
      {
        city: 'Petaling Jaya',
        postcodes: [
          46000,
          46050,
          46100,
          46150,
          46200,
          46300,
          46350,
          46400,
          46506,
          46547,
          46549,
          46551,
          46564,
          46582,
          46598,
          46662,
          46667,
          46668,
          46672,
          46675,
          46700,
          46710,
          46720,
          46730,
          46740,
          46750,
          46760,
          46770,
          46780,
          46781,
          46782,
          46783,
          46784,
          46785,
          46786,
          46787,
          46788,
          46789,
          46790,
          46791,
          46792,
          46793,
          46794,
          46795,
          46796,
          46797,
          46798,
          46799,
          46800,
          46801,
          46802,
          46803,
          46804,
          46805,
          46806,
          46860,
          46870,
          46960,
          46962,
          46964,
          46966,
          46968,
          46970,
          46972,
          46974,
          46976,
          46978,
          47300,
          47301,
          47307,
          47308,
          47400,
          47410,
          47500,
          47800,
          47810,
          47820,
          47830
        ]
      },
      {
        city: 'Puchong',
        postcodes: [
          47100,
          47110,
          47120,
          47130,
          47140,
          47150,
          47160,
          47170,
          47180,
          47190
        ]
      },
      {
        city: 'Pulau Carey',
        postcodes: [42960]
      },
      {
        city: 'Pulau Indah',
        postcodes: [42920]
      },
      {
        city: 'Pulau Ketam',
        postcodes: [42940]
      },
      {
        city: 'Rasa',
        postcodes: [44200]
      },
      {
        city: 'Rawang',
        postcodes: [48000, 48010, 48020, 48050, 48100, 48300]
      },
      {
        city: 'Sabak Bernam',
        postcodes: [45200, 45207, 45209]
      },
      {
        city: 'Sekinchan',
        postcodes: [45400]
      },
      {
        city: 'Semenyih',
        postcodes: [43500]
      },
      {
        city: 'Sepang',
        postcodes: [43900]
      },
      {
        city: 'Serdang',
        postcodes: [43400]
      },
      {
        city: 'Serendah',
        postcodes: [48200]
      },
      {
        city: 'Seri Kembangan',
        postcodes: [43300]
      },
      {
        city: 'Shah Alam',
        postcodes: [
          40000,
          40100,
          40150,
          40160,
          40170,
          40200,
          40300,
          40400,
          40450,
          40460,
          40470,
          40500,
          40502,
          40503,
          40505,
          40512,
          40517,
          40520,
          40529,
          40542,
          40548,
          40550,
          40551,
          40560,
          40564,
          40570,
          40572,
          40576,
          40578,
          40582,
          40590,
          40592,
          40594,
          40596,
          40598,
          40604,
          40607,
          40608,
          40610,
          40612,
          40620,
          40622,
          40626,
          40632,
          40646,
          40648,
          40660,
          40664,
          40670,
          40672,
          40673,
          40674,
          40675,
          40676,
          40680,
          40690,
          40700,
          40702,
          40704,
          40706,
          40708,
          40710,
          40712,
          40714,
          40716,
          40718,
          40720,
          40722,
          40724,
          40726,
          40728,
          40730,
          40732,
          40800,
          40802,
          40804,
          40806,
          40808,
          40810,
          40990
        ]
      },
      {
        city: 'Subang Airport',
        postcodes: [47200]
      },
      {
        city: 'Subang Jaya',
        postcodes: [47500, 47507, 47600, 47610, 47620, 47630, 47640, 47650]
      },
      {
        city: 'Sungai Ayer Tawar',
        postcodes: [45100]
      },
      {
        city: 'Sungai Besar',
        postcodes: [45300]
      },
      {
        city: 'Sungai Buloh',
        postcodes: [47000]
      },
      {
        city: 'Sungai Pelek',
        postcodes: [43950]
      },
      {
        city: 'Tanjong Karang',
        postcodes: [45500]
      },
      {
        city: 'Tanjong Sepat',
        postcodes: [42800]
      },
      {
        city: 'Telok Panglima Garang',
        postcodes: [42425, 42500, 42507, 42509]
      }
    ]
  },
  {
    area: 'Terengganu',
    postcodes: [
      {
        city: 'Ajil',
        postcodes: [21800, 21810, 21820]
      },
      {
        city: 'Al Muktatfi Billah Shah',
        postcodes: [23400]
      },
      {
        city: 'Ayer Puteh',
        postcodes: [24050]
      },
      {
        city: 'Bukit Besi',
        postcodes: [23200]
      },
      {
        city: 'Bukit Payong',
        postcodes: [21400]
      },
      {
        city: 'Ceneh',
        postcodes: [24050, 24060]
      },
      {
        city: 'Chalok',
        postcodes: [21450]
      },
      {
        city: 'Cukai',
        postcodes: [24000, 24007, 24009]
      },
      {
        city: 'Dungun',
        postcodes: [23000, 23007, 23009, 23050]
      },
      {
        city: 'Jerteh',
        postcodes: [22000, 22010, 22020]
      },
      {
        city: 'Kampung Raja',
        postcodes: [22200]
      },
      {
        city: 'Kemasek',
        postcodes: [24200, 24207, 24209]
      },
      {
        city: 'Kerteh',
        postcodes: [24300]
      },
      {
        city: 'Ketengah Jaya',
        postcodes: [23300]
      },
      {
        city: 'Kijal',
        postcodes: [24100, 24107, 24109]
      },
      {
        city: 'Kuala Berang',
        postcodes: [21700]
      },
      {
        city: 'Kuala Besut',
        postcodes: [22300, 22307, 22309]
      },
      {
        city: 'Kuala Terengganu',
        postcodes: [
          20000,
          20050,
          20100,
          20200,
          20300,
          20400,
          20500,
          20502,
          20503,
          20504,
          20505,
          20506,
          20508,
          20512,
          20514,
          20516,
          20517,
          20518,
          20519,
          20520,
          20532,
          20534,
          20536,
          20538,
          20540,
          20542,
          20546,
          20548,
          20550,
          20551,
          20552,
          20554,
          20556,
          20560,
          20564,
          20566,
          20568,
          20570,
          20572,
          20576,
          20578,
          20582,
          20586,
          20590,
          20592,
          20596,
          20600,
          20604,
          20606,
          20608,
          20609,
          20610,
          20612,
          20614,
          20618,
          20620,
          20622,
          20626,
          20628,
          20630,
          20632,
          20646,
          20648,
          20656,
          20658,
          20660,
          20661,
          20662,
          20664,
          20668,
          20670,
          20672,
          20673,
          20674,
          20676,
          20680,
          20690,
          20698,
          20700,
          20710,
          20720,
          20900,
          20902,
          20904,
          20906,
          20908,
          20910,
          20912,
          20914,
          20916,
          20918,
          20920,
          20922,
          20924,
          20926,
          20928,
          20930,
          20990,
          21000,
          21009,
          21010,
          21020,
          21030,
          21040,
          21060,
          21070,
          21080,
          21090,
          21100,
          21109,
          21200,
          21209,
          21210,
          21220,
          21300,
          21309
        ]
      },
      {
        city: 'Marang',
        postcodes: [21600, 21610]
      },
      {
        city: 'Paka',
        postcodes: [23100]
      },
      {
        city: 'Permaisuri',
        postcodes: [22100, 22107, 22109, 22110, 22120]
      },
      {
        city: 'Sungai Tong',
        postcodes: [21500]
      }
    ]
  }
]

export const languagesArray = [
  {
    id: 0,
    name: 'English',
    link: 'en'
  },
  {
    id: 1,
    name: 'Bahasa Malaysia',
    link: 'my'
  },
  {
    id: 2,
    name: 'Chinese',
    link: 'zh'
  }
]

const CONST = {
  more: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: true
    }
  ],
  moreAbout: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_about',
      localPath: '/more/about',
      path: '/more/about',
      disabled: true
    }
  ],
  moreAboutAchievements: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_about',
      localPath: '/more/about',
      path: '/more/about',
      disabled: false
    },
    {
      label: 'breadcrumb_achievements',
      localPath: 'link_about_achievementsPath',
      path: 'link_about_achievements',
      disabled: true
    }
  ],
  moreAboutCompany: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_about',
      localPath: '/more/about',
      path: '/more/about',
      disabled: false
    },
    {
      label: 'breadcrumb_companyinfo',
      localPath: '/more/about/company',
      path: '/more/about/company',
      disabled: true
    }
  ],
  moreAboutFeatured: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_about',
      localPath: '/more/about',
      path: '/more/about',
      disabled: false
    },
    {
      label: 'breadcrumb_featuredin',
      localPath: '/more/about/featured',
      path: '/more/about/featured',
      disabled: true
    }
  ],
  moreContact: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_contact',
      localPath: '/more/contact',
      path: '/more/contact',
      disabled: true
    }
  ],
  moreTenant: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: true
    }
  ],
  moreTenantOverview: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: false
    }
  ],
  moreTenantHow: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: false
    }
  ],
  moreTenantNodeposit: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_zero_Deposit',
      localPath: '/more/tenant/no-deposit',
      path: '/more/tenant/no-deposit',
      disabled: true
    }
  ],
  moreTenantVideo: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_video_summary',
      localPath: '/more/tenant/video',
      path: '/more/tenant/video',
      disabled: true
    }
  ],
  moreTenantGuide: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_help',
      localPath: '/more/tenant',
      path: '/more/tenant',
      disabled: false
    }
  ],
  moreLandlord: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: true
    }
  ],
  moreLandlordOverview: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: false
    }
  ],
  moreLandlordHow: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_how_it_works',
      localPath: '/more/landlord/how',
      path: '/more/landlord/how',
      disabled: true
    }
  ],
  moreLandlordProtected: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: false
    }
  ],
  moreLandlordVideo: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_video_summary',
      localPath: '/more/landlord/video',
      path: '/more/landlord/video',
      disabled: true
    }
  ],
  moreLandlordGuide: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_landlord_help',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: false
    }
  ],
  moreRefer: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_more_referral',
      localPath: '/more/refer',
      path: '/more/refer',
      disabled: true
    }
  ],
  moreReferTerms: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_more_referral',
      localPath: '/more/refer',
      path: '/more/refer',
      disabled: false
    },
    {
      label: 'T&C',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: true
    }
  ],
  moreReferFaq: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_more_referral',
      localPath: '/more/refer',
      path: '/more/refer',
      disabled: false
    },
    {
      label: 'FAQ',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: true
    }
  ],
  moreReferDashboard: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_more',
      localPath: '/more',
      path: '/more',
      disabled: false
    },
    {
      label: 'breadcrumb_more_referral',
      localPath: '/more/refer',
      path: '/more/refer',
      disabled: false
    },
    {
      label: 'Dashboard',
      localPath: '/more/landlord',
      path: '/more/landlord',
      disabled: true
    }
  ],
  dashboard: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: true
    }
  ],
  dashboardMylisting: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_my_listings',
      localPath: '/dahboard/listings',
      path: '/dahboard/listings',
      disabled: true
    }
  ],
  thanksPage: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_post',
      localPath: '/post',
      path: '/post',
      disabled: false
    }
  ],
  whatsNext: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_post',
      localPath: '/post',
      path: '/post',
      disabled: false
    }
  ],
  dashboardFavorites: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_favorites',
      localPath: '/dahboard/favorites',
      path: '/dahboard/favorites',
      disabled: true
    }
  ],
  dashboardProfile: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_profile',
      localPath: '/dahboard/profile',
      path: '/dahboard/profile',
      disabled: true
    }
  ],
  dashboardRental: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_rental_collection',
      localPath: '/dahboard/rental',
      path: '/dahboard/rental',
      disabled: true
    }
  ],
  dashboardTenantSearch: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_tenant_search',
      localPath: '',
      path: '#',
      disabled: true
    }
  ],
  postPage: [
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_post',
      localPath: '/post',
      path: '/post',
      disabled: true
    }
  ],
  editPostPage: [
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_edit_post',
      localPath: '/post',
      path: '/post',
      disabled: true
    }
  ],
  postPageGps: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_gps',
      localPath: '/post/gps/:ref',
      path: '/post/gps/:ref',
      disabled: true
    }
  ],
  postPageLead: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_post',
      localPath: '/post',
      path: '/post',
      disabled: false
    }
  ],
  postPageHrunner: [
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_homerunner',
      localPath: '/post/homerunner/',
      path: '/post/homerunner/',
      disabled: true
    }
  ],
  postPageShare: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_post',
      localPath: '/post',
      path: '/post',
      disabled: false
    }
  ],
  postPageForRent: [
    {
      label: 'breadcrumb_dashboard',
      localPath: '/dashboard',
      path: '/dashboard',
      disabled: false
    },
    {
      label: 'breadcrumb_pageForRent',
      localPath: 'link_page_for_rentPath',
      path: '/post/post-for-rent/',
      disabled: true
    }
  ],
  homeOwnership: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'Home Ownership',
      localPath: '/home-ownership',
      path: '/home-ownership',
      disabled: true
    }
  ],

  hotPage: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_hot',
      localPath: '/hot',
      path: '/hot',
      disabled: true
    }
  ],
  sitemap: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    {
      label: 'breadcrumb_sitemap',
      localPath: '/sitemap',
      path: '/sitemap',
      disabled: true
    }
  ],
  quicklink: [
    {
      label: 'breadcrumb_home',
      localPath: '/',
      path: '/',
      disabled: false
    },
    { label: 'breadcrumb_quicklink', localPath: '', path: '', disabled: true }
  ]
}

export default CONST
