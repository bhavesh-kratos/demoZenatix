import { combineReducers } from 'redux';
import examData from './examData';
import examState from './examState';

const rootReducer = combineReducers({
  examData,
  examState
});

export default rootReducer;
