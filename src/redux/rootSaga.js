import { all } from 'redux-saga/effects';


import { rootSaga as stageSaga } from '../state/stages/sagas'
import { rootSaga as userSagas } from '../state/users/user.sagas'

export default function* rootSaga() {
  yield all([stageSaga(), userSagas()]);
}
