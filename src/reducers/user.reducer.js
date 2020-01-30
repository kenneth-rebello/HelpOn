import { SET_USER, UNSET_USER } from "../redux/types";

const initialState = {
    currentUser: null
}

const userReducer = (state=initialState, action) => {

    const { type, payload } = action;

    switch(type){
        case SET_USER:
            return {
                ...state,
                currentUser: payload
            }
        case UNSET_USER:
            return{
                ...state,
                currentUser: null
            }
        default:
            return state
    }
}

export default userReducer;