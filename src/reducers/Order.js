import { UPDATE_ORDER_LIST, API_DOMAIN_URL, INIT_ORDER_DETAIL, INIT_ORDER_FOOD_DETAIL } from "../utils/Constants";

const initialState = {
    orders: [],
    foodName: '',
    foodId: null,
    name: '',
    address: '',
    phone: '',
    order: {},
    loading: true,
    response: {}
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ORDER_LIST:
            state = Object.assign({}, state, {  response: action.response, loading: false });
            return state;
        case INIT_ORDER_DETAIL:
            state = Object.assign({}, state, {  name: action.name, address: action.address, phone: action.phone, loading: false });
            return state;
        case INIT_ORDER_FOOD_DETAIL:
            state = Object.assign({}, state, {  foodName: action.foodName, foodId: action.foodId, order: action.order, loading: false });
            return state;
        default:
            return state;
    }
}