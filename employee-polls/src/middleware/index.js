import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';

const middleware = applyMiddleware(
  thunk,
  logger
);

export default middleware;
