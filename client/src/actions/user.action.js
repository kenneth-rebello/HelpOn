import { SET_USER, UNSET_USER } from "../redux/types"

export const setCurrentUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user        
    })
}

export const unsetCurrentUser = () => dispatch => {
    dispatch({
        type: UNSET_USER
    })
}