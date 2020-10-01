import { ADD_WISHLIST } from '../actions/WishListAction';

const initialState = {
    wishList:{},
}

function WishListReducer(state = initialState, action) {
    switch(action.type) {
    
    case ADD_WISHLIST:
      return {
          ...state,
          wishList:action.payload,
        };

    default:
      return state;
  };
}

export default WishListReducer;