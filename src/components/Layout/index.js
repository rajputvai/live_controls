import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  mainWrapper: {
    height: '100vh',
    fontSize: 14,
    display: 'flex',
    flexDirection: 'column',
  },
};

const MainWrapper = withStyles(styleSheet)(props => {
  const classes = props.classes;
  return <div className={classes.mainWrapper}>{props.children}</div>;
});

export { MainWrapper };
