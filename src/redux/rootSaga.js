import { all } from 'redux-saga/effects';


import { rootSaga as stageSaga } from './sagas'
import { rootSaga as userSagas } from '../state/users/user.sagas'
import { rootSaga as pathlessSagas } from '../state/pathless-users/sagas'
import { rootSaga as pathSagas } from '../state/course-path/sagas'

export default function* rootSaga() {
  yield all([stageSaga(), userSagas(), pathlessSagas(), pathSagas()]);
}
