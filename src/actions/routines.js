import { createRoutine } from 'redux-saga-routines';
import * as actionTypes from './actionTypes';

// Please note that routines helps in creating action creators of 4 types for a given actionType(string): request, success, failure and completed 

export const fetchExamData = createRoutine(actionTypes.EXAM_DATA);
export const shareImage = createRoutine(actionTypes.SHARE_IMAGE);
// These are normal action creator here

export const nextQuestion = (id) => { return { type: actionTypes.MOVE_TO_NEXT_QUESTION, payload: id }; };
export const previousQuestion = (id) => { return { type: actionTypes.MOVE_TO_PREVIOUS_QUESTION, payload: id }; };

export const switchExamStatus = (status) => { return { type: actionTypes.SWITCH_EXAM_STATUS, payload: status }; };

// it uses es6 syntax for creating keys in object
export const selectChoice = (id, choice) => { return { type: actionTypes.SELECTED_CHOICE, payload: { [id]: choice } }; };
export const clearChoice = (id, choice) => { return { type: actionTypes.CLEAR_CHOICE, payload: { [id]: '' } }; };

export const calculateScore = (score) => { return { type: actionTypes.CALCULATE_SCORE, payload: score }; };

// login
export const login = (data) => { return { type: actionTypes.LOGIN_USER, payload: data }; };
export const logout = (data) => { return { type: actionTypes.LOGOUT_USER }; };

//
export const loading = (data) => { return { type: actionTypes.LOADING, payload: data}; };
