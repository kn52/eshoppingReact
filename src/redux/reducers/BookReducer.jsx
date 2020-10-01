import { ADD_BOOKS } from "../actions/BookAction";

const initialState = {
    books:{},
}

function BookReducer(state = initialState, action) {
    console.log("Book Reducer");
    switch(action.type) {
    
    case ADD_BOOKS:
      console.log("ADD");
      return {
          ...state,
          books:action.payload,
        };

    default:
      return state;
  };
}

export default BookReducer;