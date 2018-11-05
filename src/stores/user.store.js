import { observable, computed, action } from "mobx";
import { currentUser as cu } from '../static-data'


class UserStore {

    @observable currentUser = cu;

}

export { UserStore }