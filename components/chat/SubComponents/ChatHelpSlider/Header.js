const Header = props => {
  const { styles, setCurrentLevelAndContentKey, level, linkKey } = props
  return (
    <>
      <div className={styles['helpSliderGoBackHeader']}>
        <img
          loading='lazy'
          src='/img/icons/baseline-arrow_back.svg'
          onClick={_ => setCurrentLevelAndContentKey(level, linkKey)}
        />
        <h2 className={styles['helpSliderGoBackHeader__goBackText']}>Back</h2>
      </div>
    </>
  )
}

export default Header
