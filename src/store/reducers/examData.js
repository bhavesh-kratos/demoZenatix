import { fetchExamData } from '../../actions/routines';

const initialState = {
    data: null,
    total_questions: 0,
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchExamData.TRIGGER:
            return {
                ...state,
                loading: true,
            };
        case fetchExamData.SUCCESS:
            console.log("action", action.payload)
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                total_questions: action.payload.total_questions
            };
        case fetchExamData.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
