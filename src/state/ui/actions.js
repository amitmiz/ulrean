import { createAction } from "redux-actions";


export const types = {
    setSideBarOpen: "UI/SET_SIDE_BAR_OPEN"
}

export const setSideBarOpen = createAction(types.setSideBarOpen)