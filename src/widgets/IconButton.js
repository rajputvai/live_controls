// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchIcon from '@material-ui/icons/Search';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const styles = {
  '@keyframes shake': {
    '40%': {
      transform: 'rotate(10deg)',
    },
    '80%': {
      transform: 'rotate(-10deg)',
    },
  },
  icon: {
    cursor: 'pointer',
    opacity: 0.8,
    '&:hover': {
      animation: 'shake .3s',
    },
  },
};

const icons = {
  add: AddIcon,
  remove: RemoveIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  deleteOutline: DeleteOutlineIcon,
  keyBoardArrowUp: KeyboardArrowUpIcon,
  keyBoardArrowDown: KeyboardArrowDownIcon,
  search: SearchIcon,
  removeRedEye: RemoveRedEyeIcon,
  addCircle: AddCircleIcon,
  removeCircle: RemoveCircleIcon,
};

function IconButton(props) {
  const { classes, type, className, ...rest } = props;
  const SelectedIcon = icons[type] || AddIcon;
  return <SelectedIcon className={classNames(classes.icon, className)} {...rest} />;
}

IconButton.defaultProps = {
  className: '',
};

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    'add',
    'remove',
    'edit',
    'delete',
    'deleteOutline',
    'keyBoardArrowUp',
    'keyBoardArrowDown',
    'removeRedEye',
    'search',
    'addCircle',
    'removeCircle',
  ]).isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(IconButton);
