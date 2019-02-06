import { types } from './action-types';
import { handleActions } from 'redux-actions';
import { ADD_ENTITIES } from '../../redux/actions';
import { stage } from '../../api/schema';



const ns = "user"

export const loggedInUserSelector = state => state[ns].models[state[ns].loggedInUser];

export const loggedInUserIdSelector = state => state[ns].loggedInUser;

export const usersSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key]);

export const userSelector = (state, id) => {
    console.log("id: " + id);
    console.log(state[ns].models[id])
    return state[ns].models[id];

}

export const pathlessUsersSelector = state => usersSelector(state).filter(user => !user.path && user.type === "student")

export const teachersSelector = state => usersSelector(state).filter(user => user.type === "teacher");

export const usersApiSelector = state => state[ns].api;


const initialState = {
    api: {
        isLoading: false, error: null
    },
    loggedInUser: null,
    addPathStatus: {
        isLoading: false,
        error: null
    },
    models: {
        // "123123434": {
        //     _id: "123123434",
        //     name: "amit",
        //     lastname: "mizrahi",
        //     phone: "052-654655",
        //     headingTo: "qa team",
        //     priorKnowlege: "javascript",
        //     photo: '/amit.jpg',
        //     type: "student",
        //     path: "1212"
        // },
        // "12312312312": {
        //     _id: "12312312312",
        //     name: "amir",
        //     phone: "052-654655",
        //     lastname: "east",
        //     headingTo: "qa team",
        //     priorKnowlege: "javascript",
        //     photo: '/amit.jpg',
        //     type: "student",
        //     path: null
        // }, "12314342312312": {
        //     _id: "12314342312312",
        //     name: "amin",
        //     phone: "052-654655",
        //     lastname: "west",
        //     photo: '/amit.jpg',
        //     type: "teacher",
        // }
    }
}









const updateUserPath = (state, { userId, path }) => {
    const newState = { ...state };
    newState.models[userId].path = path;

    return newState;
}


const reducerMap = {
    [types.authRequest]: (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    "FETCH_USER": (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.authRequestSuccess]: (state, { payload }) => ({
        ...state, models: { ...state.models, [payload._id]: payload }, loggedInUser: payload._id, token: payload.token, api: { isLoading: false, error: null }
    }),
    [types.authRequestError]: (state, { payload }) => (
        { ...state, api: { isLoading: false, error: payload } }),
    //types.fetchUsersSuccess
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, models: { ...state.models, ...payload.users }, api: { isLoading: false, error: null }
    }),
    [types.fetchUsersError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    }),
    [types.addPathRequested]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.addPathSuccess]: (state, { payload }) => ({
        ...updateUserPath(state, payload), api: { isLoading: false, error: null }
    }),
    [types.addPathError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    }),



}


export default handleActions(reducerMap, initialState);