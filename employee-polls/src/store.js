import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Updated import statement
import rootReducer from './reducers';
import logger from './middleware/logger';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
