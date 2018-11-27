import { all } from 'redux-saga/effects';


import { rootSaga as stageSaga } from './sagas'
import { rootSaga as userSagas } from '../users/user.sagas'

export default function* rootSaga() {
  yield all([stageSaga(), userSagas()]);
}
