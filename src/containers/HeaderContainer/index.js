import { connect } from 'react-redux';

import Header from '../../components/Header';

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(Header);
