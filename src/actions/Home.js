import { DATA_AVAILABLE, API_DOMAIN_URL, FOOD_AVAILABLE } from '../utils/Constants';
import * as uri from '../utils/Endpoint';

export const getData = () => {
    return (dispatch) => {
        //Make API Call
        //For this example, I will be retrieving data from a json file
        //Get the sample data in the json file
        //delay the retrieval [Sample reasons only]

        getAvailableDay().then((response) => {
            dispatch({type: DATA_AVAILABLE, today_data: response});
        });
    };
};

export const getFood = () => {
    return (dispatch) => {
        getAvailableDay().then((response) => {
            console.log('dispatch');
            let food = response.food;
            dispatch({type: FOOD_AVAILABLE, today_food: food});
        });
    };
};

const getAvailableDay = () => {
    let url = API_DOMAIN_URL + uri.GET_TODAY;
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            return responseJson.data;
        }).catch((error) => {
            console.error(error);
            return [];
        });
};