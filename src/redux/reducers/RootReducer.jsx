import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import BookReducer from "./BookReducer";

const RootReducer = combineReducers({
    auth:AuthReducer,
    book:BookReducer,
})

export default RootReducer;