import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000'
    }
  },
  props: {
    MuiSvgIcon: {
      fontSize: 'small'
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '16px',
        color: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: '#424242'
      }
    }
  }
})

export default theme
