import { PERMISSION } from "../actions/AuthAction";

const initialState = {
    adminAuth: true,
    userAuth : true
}

const AuthReducer = ( state = initialState, action) => {
    switch (action.type) {
        case PERMISSION:
            return {
                ...state,
                auth: action.payload
            }
    
        default: return state
    }
};

export default AuthReducer;