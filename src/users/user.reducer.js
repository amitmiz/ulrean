import { types } from './user.action-types';


const initialState = {
    isLoading: true,
    data: undefined
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case (types.authRequest):
            return { isLoading: true, data: null };
        case (types.authRequestSuccess):
            return { isLoading: false, data: payload }
        case (types.authRequestError):
            return { isLoading: false, error: payload }
        default:
            return state;

    }



}

export default reducer;