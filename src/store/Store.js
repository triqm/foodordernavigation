import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers/AppReducers'; //Import the reducer
import { middleware } from '../utils/Redux';

export default createStore(appReducer, applyMiddleware(thunk, middleware));