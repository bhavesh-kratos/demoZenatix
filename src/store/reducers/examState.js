import { fetchExamData } from '../../actions/routines';
import { SWITCH_EXAM_STATUS, SELECTED_CHOICE, CLEAR_CHOICE, CALCULATE_SCORE, LOGOUT_USER } from '../../actions/actionTypes';

const initialState = {
    attempted_questions: null,   //object id: choice
    can_attempt: true,
    total_score: null,
    section_score: null  //object section: score
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_CHOICE:
            console.log('attempted_questions', state.attempted_questions);
            return {
                ...state,
                attempted_questions: { ...state['attempted_questions'], ...action.payload },
            };
        case CLEAR_CHOICE:
            console.log('attempted_questions', state.attempted_questions);
            return {
                ...state,
                attempted_questions: { ...state['attempted_questions'], ...action.payload },
            };
        case SWITCH_EXAM_STATUS:
            return {
                ...state,
                can_attempt: action.payload
            };
        case CALCULATE_SCORE:
            console.log('tota', action.payload.total)
            return {
                ...state,
                total_score: action.payload.total,
                section_score: action.payload.individual
            };
        case LOGOUT_USER:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;
