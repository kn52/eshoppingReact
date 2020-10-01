import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import BookReducer from "./BookReducer";
import WishListReducer from "./WishListReducer";

const RootReducer = combineReducers({
    auth:AuthReducer,
    book:BookReducer,
    wish:WishListReducer,
})

export default RootReducer;