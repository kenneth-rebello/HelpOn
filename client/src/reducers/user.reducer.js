import { SET_USER, UNSET_USER } from "../redux/types";

const initialState = {
    currentUser: null,
    registered: false,
    loading: true
}

const userReducer = (state=initialState, action) => {

    const { type, payload } = action;

    switch(type){
        case SET_USER:
            return {
                ...state,
                currentUser: payload,
                registered: payload.registered,
                loading:false
            }
        case UNSET_USER:
            return{
                ...state,
                currentUser: null,
                registered: false,
                loading: false
            }
        default:
            return state
    }
}

export default userReducer;