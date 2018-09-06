import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import InfoIcon from '../../../assets/svgs/Info';
import IconButton from '../../../assets/IconButton';

import Color from '../../../utilities/theme/Color';

const styles = {
  actionBar: {
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: Color.primary.p2,
  },
  divider: {
    margin: '0 10px',
  },
  infoIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  flex: {
    flex: 1,
  },
  iconButtonWrapper: {
    marginLeft: 8,
    width: 35,
    height: 30,
    borderRadius: 2,
    backgroundColor: Color.other.o2,
    border: `solid 1px ${Color.other.o7}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: '#d5d5d5',
    },
  },
};

function TableHeader(props) {
  const { classes } = props;

  return (
    <Grid container className={classes.actionBar} alignItems="center">
      <div>
        CURRENT HOUR: <span className={classes.boldText}>12:00 - 13:00</span>
      </div>
      <div className={classes.divider}>|</div>
      <div>
        FCT PLAYED: <span className={classes.boldText}>00:00:00:00</span>
      </div>
      <InfoIcon className={classes.infoIcon} />
      <div className={classes.flex} />
      <div className={classes.iconButtonWrapper}>
        <IconButton type="edit" className={classes.iconButton} />
      </div>
      <div className={classes.iconButtonWrapper}>
        <IconButton type="removeRedEye" className={classes.iconButton} />
      </div>
      <div className={classes.iconButtonWrapper}>
        <IconButton type="search" className={classes.iconButton} />
      </div>
    </Grid>
  );
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableHeader);
