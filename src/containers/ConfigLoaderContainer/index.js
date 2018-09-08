import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfigLoader)
);
