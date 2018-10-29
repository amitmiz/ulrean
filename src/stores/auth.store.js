import { observable, computed, action } from "mobx";


 class AuthStore {
    
    @observable isLoggedIn = false;

    @action
    login() {
        this.isLoggedIn = true;
    }

}

export {AuthStore}