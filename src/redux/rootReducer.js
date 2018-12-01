import { combineReducers } from 'redux';


import { reducer as challenge } from '../state/stage-proccessor/redux'
import stageReducer from "./reducers";
import userReducer from '../state/users/user.reducer';
import pathlessReducer from '../state/pathless-users/reducer';
import pathReducer from '../state/course-path/reducer';




export default combineReducers({
  challenge,
  stage: stageReducer,
  user: userReducer,
  pathless: pathlessReducer,
  path: pathReducer
});
