import { observable, computed, action } from "mobx";


 class CourseModeStore {
    
    @observable courseStats = {
        currLevel : 1,
        maxLevel : 10
    }

    @observable currStage = {
        codePlaceholder : "",
        learn : "",
        instructions : ""
    }




    @action
    login() {
        this.isLoggedIn = true;
    }

}

export {CourseModeStore}