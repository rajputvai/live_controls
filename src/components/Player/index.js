import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Color from '../../utilities/theme/Color';

const styles = {
  root: {
    boxShadow: 'none',
    borderRadius: 2,
    border: `solid 1px ${Color.primary.p2}`,
    margin: 0,
  },
};

class Player extends Component {
  componentDidMount() {
    window[this.props.globalKey] = window.vxgplayer(this.element.id);
  }

  render() {
    const { classes, id, url, width, height } = this.props;
    return (
      <div
        style={{
          width,
          height,
          overflow: 'hidden',
        }}
      >
        <div
          ref={el => {
            this.element = el;
          }}
          id={id}
          className={classNames('vxgplayer', classes.root)}
          url={url}
          aspect-ratio="true"
          mute="true"
          latency="150"
          autostart="true"
          nmf-src="/javascripts/vxgplayer/pnacl/Release/media_player.nmf"
          nmf-path="/vxgplayer/media_player.nmf"
          width={`${width}px`}
          height={`${height}px`}
          avsync="true"
        />
      </div>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  globalKey: PropTypes.string.isRequired,
};

Player.defaultProps = {
  width: 343,
  height: 221,
};

export default withStyles(styles)(Player);
