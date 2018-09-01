import { connect } from 'react-redux';

import Header from '../../components/Header';
import { sendMessage } from '../../actions/webSocketActions';

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(Header);
