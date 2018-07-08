import { createSelector } from 'reselect';

const getSectionQuestions = (state, index) => ({ 'questions': state.examData.data, 'question_index': index });

export const getCurrentQuestion = createSelector(
    [getSectionQuestions],
    (sectionQuestions) => {
        let { questions } = sectionQuestions;
        let index = sectionQuestions.question_index;

        console.log('asdasdasd', index);
        if (typeof questions === 'undefined' || questions === null) {
            return null;
        }
        return questions[index];
        // if (questionId === null) {
        //     return questions[0];
        // }
        // let index = questions.findIndex(x => x.id === questionId);
        // if (index === -1) {
        //     console.log('Not possible in this case. Programmatical Bug exists.')
        // }
        // return questions[index];
    }
);