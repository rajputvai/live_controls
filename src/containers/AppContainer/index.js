import { connect } from 'react-redux';

import App from '../../components/App';
import { loadEvents } from '../../actions/eventsActions';

export default connect(
  null,
  { loadEvents }
)(App);
