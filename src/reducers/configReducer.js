import { produce } from 'immer';

import { types } from '../actions/configActions';
import axios from '../utilities/axios';

const initialState = {
  loading: false,
  loaded: false,
  config: {},
};

export default function configReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOADING_CONFIG:
        draft.loading = true;
        break;

      case types.LOADED_CONFIG:
        draft.loading = false;
        draft.loaded = true;
        draft.config = action.payload.config;
        axios.defaults.baseURL = action.payload.config.API_URL;
        axios.defaults.params = { auth_token: action.payload.config.AUTH_TOKEN };
        break;

      default:
        return draft;
    }
  });
}
