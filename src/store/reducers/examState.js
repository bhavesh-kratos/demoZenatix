import { fetchExamData } from '../../actions/routines';
import { SWITCH_EXAM_STATUS } from '../../actions/actionTypes';

const initialState = {
    attempted_questions: [],
    can_attempt: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case fetchExamData.TRIGGER:
        //     return {
        //         ...state,
        //         attempted_questions: action.payload,
        //     };
        case SWITCH_EXAM_STATUS:
            return {
                ...state,
                can_attempt: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
