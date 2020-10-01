import { ADD_CARTLIST, ADD_USER_DETAILS, ADD_CUSTOMER_DETAILS } from "../actions/CartAction";

const initialState = {
    cartList:{},
    userDetail:{},
    customerDetail:{}
}

function CartReducer(state = initialState, action) {
    switch(action.type) {
    
    case ADD_CARTLIST:
      return {
          ...state,
          cartList:action.payload,
        };
    
    case ADD_USER_DETAILS:
        return {
            ...state,
            userDetail:action.payload,
        };

    case ADD_CUSTOMER_DETAILS:
        return {
            ...state,
            customerDetail:action.payload,
        };

    default:
      return state;
  };
}

export default CartReducer;