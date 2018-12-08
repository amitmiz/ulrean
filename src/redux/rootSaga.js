import { all } from 'redux-saga/effects';


import { rootSaga as stageSaga } from '../state/stage-proccessor/sagas'
import { rootSaga as userSagas } from '../state/users/user.sagas'
import { rootSaga as progressSaga } from '../state/courses-progress/sagas'
import { rootSaga as pathSaga } from '../state/predefiend-path/sagas'
import { rootSaga as submissionSaga } from '../state/projects-submissions/sagas';
export default function* rootSaga() {
  yield all(
    [
      stageSaga(),
      userSagas(),
      progressSaga(),
      pathSaga(),
      submissionSaga()
    ]
  );
}
