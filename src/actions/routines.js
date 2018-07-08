import { createRoutine } from 'redux-saga-routines';
import * as actionTypes from './actionTypes';

// please note that routines helps in creating action creators of 4 types for a given actionType(string): request, success, failure and completed 

export const fetchExamData = createRoutine(actionTypes.EXAM_DATA);


//this is a normal action creator here

export const nextQuestion = (id) => { return { type: actionTypes.MOVE_TO_NEXT_QUESTION, payload: id }; };
export const previousQuestion = (id) => { return { type: actionTypes.MOVE_TO_PREVIOUS_QUESTION, payload: id }; };

export const switchExamStatus = (status) => { return { type: actionTypes.SWITCH_EXAM_STATUS, payload: status }; };