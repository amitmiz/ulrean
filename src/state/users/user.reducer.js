import { types } from './user.action-types';
import { handleActions } from 'redux-actions';



const ns = "user"

export const userSelector = state => state[ns].data;


const initialState = {
    isLoading: true,
    data: {
        _id: 123123434,
        name: "amit",
        lastname: "mizrahi",
        phone: "052-654655",
        photo: './amit.jpg',
        type: "student"

    }
}


const reducerMap = {
    [types.authRequest]: () => ({
        isLoading: true, data: null
    }),
    [types.authRequestSuccess]: (state, { payload }) => ({
        isLoading: false, data: payload
    }),
    [types.authRequestError]: (state, { payload }) => (
        { isLoading: false, error: payload }),
}

const reducer = handleActions(reducerMap, initialState)


export default reducer;