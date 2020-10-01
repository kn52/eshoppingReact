import { ADD_WISHLIST } from '../actions/WishListAction';

const initialState = {
    wishList:{},
}

function WishListReducer(state = initialState, action) {
    console.log("Book Reducer");
    switch(action.type) {
    
    case ADD_WISHLIST:
      console.log("ADD");
      return {
          ...state,
          wishList:action.payload,
        };

    default:
      return state;
  };
}

export default WishListReducer;