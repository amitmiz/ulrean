import { combineReducers } from 'redux';


import { reducer as challenge } from '../stage-proccessor/redux'
import stageReducer from "./reducers";
import userReducer from '../users/user.reducer';
import pathlessReducer from '../pathless-users/reducer';
import pathReducer from '../course-path/reducer';




export default combineReducers({
  challenge,
  stage: stageReducer,
  user: userReducer,
  pathless: pathlessReducer,
  path: pathReducer
});
