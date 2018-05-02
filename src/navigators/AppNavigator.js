import React from 'react';
import PropTypes from 'prop-types'; // 15.6.0
import { connect } from 'react-redux'; // 5.0.6

import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

import { addNavigationHelpers, StackNavigator } from 'react-navigation'; // 1.0.0-beta.19
import Foods from '../components/Foods';
import Home from '../components/Home';

import OrderFoodModal from '../components/OrderFoodModal';
import OrderModal from '../components/OrderModal';
import "redux"; // 3.7.2

export const AppNavigator = StackNavigator({
    HomeAction: { screen: Home },
    Foods: { screen: Foods },
    OrderFoodModal: { screen: OrderFoodModal },
    OrderModal: { screen: OrderModal },
    },
    {
        initialRouteName: 'HomeAction',
        mode: 'modal'
    });

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);