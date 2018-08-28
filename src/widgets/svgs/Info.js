import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    '&:hover circle': { fill: '#f8e200' },
  },
};

function Info({ classes, ...props }) {
  return (
    <SvgIcon width="14" height="14" viewBox="0 0 14 14" {...props}>
      <g className={classes.icon} transform="translate(1 1)">
        <circle cx="6" cy="6" r="6" fill="none" stroke="#F8E200" />
        <path
          id="i"
          fill="#525E66"
          d="M6.701 9.498H5.606V4.622h1.095v4.876zM5.538 3.355c0-.168.054-.308.16-.419.107-.111.26-.167.458-.167s.352.056.46.167c.108.111.162.25.162.42a.563.563 0 0 1-.162.412c-.108.11-.262.164-.46.164s-.35-.055-.458-.164a.568.568 0 0 1-.16-.413z"
        />
      </g>
    </SvgIcon>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);
