import { shareImage } from '../../actions/routines';
import { LOGIN_USER, LOGOUT_USER } from '../../actions/actionTypes';

const initialState = {
    user_data: null,
    name: null,
    picture_url: null,
    image_shared: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            console.log('authhsdsadsad', action.payload)
            return { ...state, user_data: action.payload, name: action.payload.name, picture_url: action.payload.picture_url };
        case LOGOUT_USER:
            return { ...state, user_data: null };
        case shareImage.SUCCESS:
            return { ...state, image_shared: true };
        default:
            return state;
    }
};

export default reducer;
