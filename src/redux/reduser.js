import { SET_NAME } from "./actions"

const initialState = {
    name: 'יעקב '
}


export default function reduser(state = initialState, action) {
    switch (action.type) {
        case SET_NAME:
            return { ...state, name: action.payload };
        default:
            return state;

    }
}