import { combineReducers } from 'redux';


import { reducer as challenge } from '../stage-proccessor/redux'
import stageReducer from "./reducers";
import userReducer from '../users/user.reducer';


export default combineReducers({
  challenge,
  stage : stageReducer,
  user : userReducer
});
