import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConfigLoader from '../../components/ConfigLoader';

import { loadConfig } from '../../actions/configActions';

function mapStateToProps(state) {
  return {
    config: state.config,
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
