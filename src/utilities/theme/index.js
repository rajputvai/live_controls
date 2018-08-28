import { createMuiTheme } from '@material-ui/core/styles';
import Color from './Color';

export default createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: Color.primary.p2,
        boxShadow: '-2px 2px 4px 0 rgba(0, 0, 0, 0.2)',
      },
    },
    MuiButton: {
      containedPrimary: {
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 2,
      },
      sizeSmall: {
        fontSize: 14,
      },
    },
    MuiTabs: {
      indicator: {
        background: '#00b6dc',
        height: 4,
      },
      flexContainer: {
        height: '100%',
      },
    },
  },
  palette: {
    primary: {
      main: Color.primary.p1,
    },
    secondary: {
      main: Color.primary.p3,
    },
  },
});
