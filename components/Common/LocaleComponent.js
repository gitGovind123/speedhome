import useTranslation from 'next-translate/useTranslation'

export const i18n = props => {
  const { t } = useTranslation('common')

  return t(props)
}

export default i18n
