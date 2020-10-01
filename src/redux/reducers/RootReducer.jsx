import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import BookReducer from "./BookReducer";
import WishListReducer from "./WishListReducer";
import CartReducer from "./CartReducer";

const RootReducer = combineReducers({
    auth:AuthReducer,
    book:BookReducer,
    wish:WishListReducer,
    cart:CartReducer,
})

export default RootReducer;