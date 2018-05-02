//@flow

import React from 'react';
import { Provider } from 'react-redux'; // 5.0.6
import { createStore } from 'redux'; // 3.7.2

import AppWithNavigationState from './src/navigators/AppNavigator';
import store from './src/store/Store';

export default class NavigationApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
