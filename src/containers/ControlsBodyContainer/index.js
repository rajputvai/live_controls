import { connect } from 'react-redux';

import ControlsBody from '../../components/ControlsBody';

function mapStateToProps(state) {
  return { playlist: state.playlist };
}

export default connect(mapStateToProps)(ControlsBody);
