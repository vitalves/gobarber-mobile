import { combineReducers } from 'redux';

// Import Reducers:
import auth from './auth/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  user,
  // demais reducers...
});
