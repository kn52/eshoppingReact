import RootReducer from '../reducers/RootReducer';
import { createStore } from 'redux';

const store = createStore(RootReducer);

export default store;