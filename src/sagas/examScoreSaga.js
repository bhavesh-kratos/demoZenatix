import { takeLatest, call, put, select } from 'redux-saga/effects';
import { calculateScore } from '../actions/routines';
import { computeScore, computeIndividualScore } from '../lib/helpers';
import { SWITCH_EXAM_STATUS } from '../actions/actionTypes';
// import {history} from '../index';

// selectors
const getQuestions = state => state.examData.data;
const getUserResponses = state => state.examState.attempted_questions;


/* WORKER SAGA 
* This saga will calculate total score, individual score and redirect user to sharescreen
*/
function* calculateScoreSaga(action) {
    try {
        const questions = yield select(getQuestions);
        const choices = yield select(getUserResponses);
        console.log('sdsad', questions, choices);
        // questions: array of object n choices object (ques : choice)
        const computedScore = yield computeScore(questions, choices);
        const individualScore = yield computeIndividualScore(questions, choices);
        console.log('scoreee', computedScore);
        yield put(calculateScore({ 'total': computedScore, 'individual': individualScore }));
        // yield put(history.push, '/share');
    } catch (error) {
        console.log('ERROR WITH computing score----->', error)
    }
}


/* WATCHER SAGA  listening to switch exam status action */
export default function* watchExamScore() {
    yield takeLatest(SWITCH_EXAM_STATUS, calculateScoreSaga);
}
