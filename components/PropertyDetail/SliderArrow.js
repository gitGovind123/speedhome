import ArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

export function NextArrow (props) {
  const { className, style, onClick, rightPosition } = props
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        top: '50%',
        transform: 'translate(50%, -50%)',
        padding: 0,
        margin: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        opacity: '50%',
        boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: rightPosition ? '#c1c1c1' : '#ffffff',
        right: rightPosition ? '-5rem' : '2rem',
        zIndex: 11
      }}
      onClick={onClick}
    >
      <ArrowRight
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          height: '2rem',
          width: '2rem'
          // marginRight: '.5rem'
        }}
      />
    </div>
  )
}
export function PrevArrow (props) {
  const { className, style, onClick, leftPosition } = props
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        margin: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        opacity: '50%',
        boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: leftPosition ? '#c1c1c1' : '#ffffff',
        left: leftPosition ? '-2rem' : '2rem',
        zIndex: 11
      }}
      onClick={onClick}
    >
      <ArrowLeft
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          height: '2rem',
          width: '2rem'
          // marginRight: '.5rem'
        }}
      />
    </div>
  )
}
