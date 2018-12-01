import { combineEpics } from 'redux-observable';

import { epics as inCourseEpics } from '../state/stage-proccessor/redux'

const rootEpic = combineEpics(...inCourseEpics);

export default rootEpic;
