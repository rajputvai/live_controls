import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Color from '../../utilities/theme/Color';
import IconButton from '../../assets/IconButton';

const styles = {
  root: {
    '&:hover $controlsWrapper': {
      display: 'flex',
    },
    overflow: 'hidden',
    position: 'relative',
  },
  player: {
    boxShadow: 'none',
    borderRadius: 2,
    border: `solid 1px ${Color.primary.p2}`,
    margin: 0,
    position: 'absolute',
  },
  controlsWrapper: {
    position: 'absolute',
    zIndex: 100,
    display: 'none',
    alignItems: 'center',
    padding: '5px 10px',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  volumeIcon: {
    color: '#fff',
  },
};

class Player extends Component {
  state = { volume: 0 };

  componentDidMount() {
    const player = window.vxgplayer(this.element.id);
    window[this.props.globalKey] = player;
    player.play();
    player.volume(this.state.volume);
    if (this.props.globalKey === 'inputPlayer') {
      player.onStateChange(state => {
        this.props.setPlayerState(state);
      });
    }
  }

  handleVolume = () => {
    this.setState(prevState => {
      if (prevState.volume === 0) {
        window[this.props.globalKey].volume(1);
        return { volume: 1 };
      }
      window[this.props.globalKey].volume(0);
      return { volume: 0 };
    });
  };

  render() {
    const { classes, id, url, width, height, latency } = this.props;
    return (
      <div
        style={{
          width,
          height,
        }}
        className={classes.root}
      >
        <div
          ref={el => {
            this.element = el;
          }}
          id={id}
          className={classNames('vxgplayer', classes.player)}
          url={url}
          aspect-ratio="true"
          latency={latency}
          autostart="true"
          nmf-src="/javascripts/vxgplayer/pnacl/Release/media_player.nmf"
          nmf-path="/vxgplayer/media_player.nmf"
          width={`${width}px`}
          height={`${height}px`}
          auto-reconnect="true"
        />
        <div className={classes.controlsWrapper}>
          {this.state.volume === 0 ? (
            <IconButton type="volumeOff" onClick={this.handleVolume} className={classes.volumeIcon} />
          ) : (
            <IconButton type="volumeUp" onClick={this.handleVolume} className={classes.volumeIcon} />
          )}
        </div>
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
  latency: PropTypes.string.isRequired,
  setPlayerState: PropTypes.func.isRequired,
};

Player.defaultProps = {
  width: 343,
  height: 221,
};

export default withStyles(styles)(Player);
