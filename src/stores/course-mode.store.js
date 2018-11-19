import { observable, computed, action, runInAction } from "mobx";

const stages = [{
    codePlaceholder: `<!DOCTYPE html>
<html>

<head>
  <title>Vacation World</title>
</head>`,

    learnHeader: "Inline Styles",
    learnSubheader: "CSS SETUP AND SELECTORS",
    learn: "Although CSS is a different language than HTML, it's possible to write CSS code directly within HTML code using inline styles.",
    instructions: ["In index.html, use inline styles to set the font-family of the first paragraph to Arial."]
}, {
    codePlaceholder: `<!DOCTYPE html>
<html>

<head>
  <title>Vacation World</title>
</head>`,

    learnHeader: "Inline Styles2",
    learnSubheader: "CSS SETUP AND SELECTORS2",
    learn: "Although CSS is a different language than HTML, it's possible to write CSS code directly within HTML code using inline styles.",
    instructions: ["In index.html, use inline styles to set the font-family of the first paragraph to Arial."]
}]

class CourseModeStore {

    @observable currStageIndex = 0;

    @observable currCourse = {
        name: ""
    }

    @observable courseStats = {
        currLevel: 1,
        maxLevel: 10
    }

     @computed get currStage() { return stages[this.currStageIndex] }


    @action
    nextStage() {
        this.currStageIndex = (this.currStageIndex + 1) % stages.length
    }

    @action
    prevStage() {
        this.currStageIndex = (this.currStageIndex - 1) % stages.length
    }

    @action.bound
    run() {

    }


}

export { CourseModeStore }