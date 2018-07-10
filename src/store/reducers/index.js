import { combineReducers } from 'redux';
import examData from './examData';
import examState from './examState';
import userData from './userData';

const rootReducer = combineReducers({
  examData,
  examState,
  userData
});

export default rootReducer;
