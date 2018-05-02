import { DATA_AVAILABLE, API_DOMAIN_URL, FOOD_AVAILABLE } from "../utils/Constants";

const initialState = { cards: [
    {
        id: 0,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic1.jpg",
        title: "Chủ nhật"
    },
    {
        id: 1,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic2.jpg",
        title: "Thứ hai"
    },
    {
        id: 2,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic3.jpg",
        title: "Thứ ba"
    },
    {
        id: 3,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic4.jpg",
        title: "Thứ tư"
    },
    {
        id: 4,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic5.jpg",
        title: "Thứ năm"
    },
    {
        id: 5,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic6.jpg",
        title: "Thứ sáu"
    },
    {
        id: 6,
        imageUrl: API_DOMAIN_URL + "/bundles/app/front_office/images/pic7.jpg",
        title: "Thứ bảy"
    }
], loading:true };

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, {  today_data: action.today_data, loading: false });
            return state;
        case FOOD_AVAILABLE:
            state = Object.assign({}, state, {  today_food: action.today_food, loading: false });
            return state;
        default:
            return state;
    }
}