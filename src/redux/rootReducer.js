import { combineReducers } from 'redux';


import { reducer as challenge } from '../state/stage-proccessor/redux'
import userReducer from '../state/users/user.reducer';
import coursesReducer from '../state/courses/reducer';
import pathsReducer from '../state/predefiend-path/reducer';
import stagesReducer from '../state/stages/reducer';
import questionsReducer from '../state/questions/reducer';



export default combineReducers({
  challenge,
  user: userReducer,
  paths: pathsReducer,
  courses: coursesReducer,
  stages: stagesReducer,
  questions: questionsReducer
});
