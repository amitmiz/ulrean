import { combineEpics } from 'redux-observable';

import { epics as inCourseEpics } from '../state/stage-proccessor'

const rootEpic = combineEpics(...inCourseEpics);

export default rootEpic;
