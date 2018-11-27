import { types } from "../actions/action-types";

const defaultFetchState = {
    isLoading: true,
    error: null
};

const initialState = {
    currentStage: {},
    stageFetchState: {
        ...defaultFetchState
    },
};


const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.fetchStage:
            return {
                ...state,
                stageFetchState: { ...defaultFetchState }
            };
        case types.fetchStageSuccess:
            return {
                ...state,
                currentStage: payload,
                stageFetchState: { isLoading: false, error: null }
            };
        case types.fetchStageError:
            return {
                ...state,
                stageFetchState: { isLoading: false, error: payload.error }
            };
        default:
            return state;
    }
};
export default rootReducer;