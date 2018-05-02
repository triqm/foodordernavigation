import { combineReducers } from 'redux'; // 3.7.2
import { NavigationActions } from 'react-navigation'; // 1.0.0-beta.19

import { AppNavigator } from '../navigators/AppNavigator';
import dataReducer from './Data';
import orderReducer from './Order';

// Start with two routes: The Second screen, with the First screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('HomeAction');

const initialNavState = AppNavigator.router.getStateForAction(
    firstAction
);

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const AppReducer = combineReducers({
    nav,
    dataReducer,
    orderReducer
});

export default AppReducer;