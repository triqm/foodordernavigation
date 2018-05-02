import { UPDATE_ORDER_LIST, INIT_ORDER_FOOD_DETAIL, API_DOMAIN_URL, INIT_ORDER_DETAIL } from '../utils/Constants';
import * as uri from '../utils/Endpoint';

import { AsyncStorage } from 'react-native';

export const updateOrders = () => {
    return async (dispatch) => {
        let response = await updateOrder();
        console.log('response update order: ', response);
        dispatch({type: UPDATE_ORDER_LIST, response: response});
    };
};


export const initOrderDetail = () => {
    return (dispatch) => {
        //Make API Call
        //For this example, I will be retrieving data from a json file
        //Get the sample data in the json file
        //delay the retrieval [Sample reasons only]

        AsyncStorage.getItem('orders').then(result => {
            result = JSON.parse(result);
            console.log('Init full order data: ', result);
            dispatch({type: INIT_ORDER_DETAIL, order: result.orderList, name: result.name, phone: result.phone, address: result.address});
        }).done();
    };
};

export const initOrderFoodDetail = (foodId, foodName) => {
    return (dispatch) => {
        //Make API Call
        //For this example, I will be retrieving data from a json file
        //Get the sample data in the json file
        //delay the retrieval [Sample reasons only]

        AsyncStorage.getItem('orders').then(result => {
            result = JSON.parse(result);
            let order = (result.orderList) ? result.orderList[foodId] : null;

            dispatch({type: INIT_ORDER_FOOD_DETAIL, foodName: foodName, foodId: foodId, order: order});
        }).done();
    };
};

const updateOrder = async function() {
    let url = API_DOMAIN_URL + uri.ORDER_SUBMIT;
    const orders = await AsyncStorage.getItem('orders');

    console.log('request orders: ', orders);
    let response = await fetch(url, {
        body: orders, // must match 'Content-Type' header
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    });

    if (response.ok) return await response.json();
    throw new Error(response.status)
};