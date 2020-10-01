import { USER_PERMISSION } from "../actions/AuthAction";

const initialState = {
    userAuth : false
}

const AuthReducer = ( state = initialState, action) => {
    console.log(state.userAuth);
    switch (action.type) {
        case USER_PERMISSION:
            return {
                ...state,
                userAuth: action.payload
            }
    
        default: return state
    }
};

export default AuthReducer;