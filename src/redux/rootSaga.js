import { all } from 'redux-saga/effects';


import stageSaga from '../state/stage-proccessor/sagas'
import userSagas from '../state/users/sagas'
import progressSaga from '../state/courses-progress/sagas'
import pathSaga from '../state/predefiend-path/sagas'
import submissionSaga from '../state/projects-submissions/sagas';
import questionsSaga from '../state/questions/sagas';
import coursesSaga from '../state/courses/sagas';
import commmentsSaga from '../state/comments/sagas';

export default function* rootSaga() {
  yield all(
    [
      stageSaga(),
      userSagas(),
      progressSaga(),
      pathSaga(),
      submissionSaga(),
      questionsSaga(),
      coursesSaga(),
      commmentsSaga()
    ]
  );
}
