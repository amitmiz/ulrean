import { combineReducers } from 'redux';


import { reducer as stage } from '../state/stage-proccessor'
import userReducer from '../state/users/reducer';
import coursesReducer from '../state/courses/reducer';
import pathsReducer from '../state/predefiend-path/reducer';
import stagesReducer from '../state/stages/reducer';
import questionsReducer from '../state/questions/reducer';
import commentsReducer from '../state/comments/reducer';
import coursesProgressReducer from '../state/courses-progress/reducer';
import projectSubmissionsReducer from '../state/projects-submissions/reducer';
import uiRedcuer from '../state/ui/reducer';


export default combineReducers({
  stage,
  user: userReducer,
  paths: pathsReducer,
  courses: coursesReducer,
  stages: stagesReducer,
  questions: questionsReducer,
  comments: commentsReducer,
  coursesProgress: coursesProgressReducer,
  projectsSubmissions: projectSubmissionsReducer,
  ui: uiRedcuer
});
