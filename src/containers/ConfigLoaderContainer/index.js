import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConfigLoader from '../../components/ConfigLoader';

import { loadConfig } from '../../actions/configActions';

function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    location: ownProps.location,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadConfig,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigLoader);
