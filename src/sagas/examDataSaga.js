import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchExamData } from '../actions/routines';
// import { apiData } from '../api/apis';
import { getDataFromBlob, sortBySection } from '../lib/helpers';
/* WORKER SAGA */
function* examDataSaga(action) {
    try {
        let questions = yield call(getDataFromBlob);
        let examData = yield call(sortBySection, questions);
        let payload = {
            'data': examData,
            'total_questions': examData.length
        };
        yield put(fetchExamData.success(payload));
    } catch (error) {
        console.log('error',error)
        yield put(fetchExamData.failure(error));
    }
}

/* WATCHER SAGA */
export default function* watchImages() {
    // run fetchDataFromServer on every trigger action
    yield takeLatest(fetchExamData.TRIGGER, examDataSaga);
}
