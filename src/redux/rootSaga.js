import { all } from 'redux-saga/effects';


import { rootSaga as stageSaga } from './sagas'
import { rootSaga as userSagas } from '../users/user.sagas'
import { rootSaga as pathlessSagas } from '../pathless-users/sagas'
import { rootSaga as pathSagas } from '../course-path/sagas'

export default function* rootSaga() {
  yield all([stageSaga(), userSagas(), pathlessSagas(), pathSagas()]);
}
