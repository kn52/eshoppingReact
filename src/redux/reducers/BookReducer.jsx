import { ADD_BOOKS } from "../actions/BookAction";

const initialState = {
    books:{},
}

function BookReducer(state = initialState, action) {
    switch(action.type) {
    
    case ADD_BOOKS:
      return {
          ...state,
          books:action.payload,
        };

    default:
      return state;
  };
}

export default BookReducer;