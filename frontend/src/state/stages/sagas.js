import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { stages, stage as singleStage } from '../../api/schema';
import { ApiClient } from '../../ApiClient';
import { addEntities } from '../../redux/actions';



function* fetchStages(action) {

    try {
        const response = yield call(ApiClient.fetchStages);
        const data = normalize(response.data, [stages]);

        yield put(addEntities(data.entities));
    } catch (e) {
        // yield put(fetchFailed(e));
        return;
    }
}

function* addNewStage(action) {

    debugger;

    let stage = {
        ...action.payload,
        learn: action.payload.learn ? action.payload.learn.split('\n') : [],
    }

    stage.required = [];
    // required: action.payload.required ? action.payload.required.split('\n') : []

    if (stage.stageType != "10") {
        let ext = ""
        switch (stage.stageType) {
            case "0":
                ext = "html"
                break;
            case "1":
                ext = "js"
                break;
            case "6":
                ext = "jsx"
                break;
            default:
                ext = ""
        }


        stage.files = {
            indexjs: {
                key: `index${ext}`,
                ext,
                name: "index",
                contents: stage.initialCode,
                head: "",
                tail: ""
            }
        }
    }




    console.log(stage);



    try {
        const newStage = yield call(ApiClient.addStage, stage);

        let { entities } = normalize(newStage.data.stage, singleStage)
        yield put(addEntities(entities))
    } catch (error) {
    }
}


export default function* rootSaga() {
    yield all(
        [
            takeLatest("STAGES/FETCH_STAGES", fetchStages),
            takeLatest("STAGES/ADD_NEW", addNewStage)
        ]
    )
}