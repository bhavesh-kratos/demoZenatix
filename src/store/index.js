import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import watchExamData from '../sagas/examDataSaga'; // listen fetchExamData.TRIGGER
import watchExamScore from '../sagas/examScoreSaga'; // listen SWITCH_EXAM_STATUS
import watchShareImage from '../sagas/shareImageSaga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer = applyMiddleware(...middlewares);
  const store = createStore(
    rootReducer,
    /* preloadedState, */
    enhancer
  );
  sagaMiddleware.run(watchExamData);
  sagaMiddleware.run(watchExamScore);
  sagaMiddleware.run(watchShareImage);
  return store;
};


export default configureStore;
