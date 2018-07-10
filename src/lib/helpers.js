import XLSX from 'xlsx';
import { DROPBOX_KEY } from '../config/config';

export const getDataFromBlob = function () {
    var Dropbox = require('dropbox').Dropbox;
    var dbx = new Dropbox({ accessToken: DROPBOX_KEY });
    return dbx.filesDownload({ path: '/Untitled spreadsheet.xlsx' })
        .then(function (response) {
            let { fileBlob } = response;
            return getDataFromFileReader(fileBlob).then(value => {
                return value
            });
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

let getDataFromFileReader = (fileBlob) => new Promise(resolve => {
    var fileReader = new FileReader();
    let worksheet, examData;
    fileReader.onload = function (e) {
        // pre-process data
        let binary = "";
        let bytes = new Uint8Array(e.target.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        // call 'xlsx' to read the file
        let workbook = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });

        let first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        worksheet = workbook.Sheets[first_sheet_name];
        examData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        resolve(examData);
    }
    fileReader.readAsArrayBuffer(fileBlob);
});

export const findIndexInArray = (arr, questionId) => {
    let index = arr.findIndex(x => x.id === questionId);
    if (index === -1) {
        console.log('Not possible. Programmatical Bug exists.')
    }
    return index;
}

const uniqueSections = (examData) => [...new Set(examData.map(item => item.Section))];

export const groupedBySection = (examData) => {
    if (typeof examData === 'undefined' || examData === null) {
        return null;
    }
    //questions grouped based on sections
    return uniqueSections(examData).map(section => {
        return {
            'section': section,
            'questions': examData.filter(value => value.Section === section)
        }
    });
}

export const sortBySection = (examData) => {
    return examData.sort(function (a, b) {
        let question1 = a.Section.toLowerCase(), question2 = b.Section.toLowerCase();
        if (question1 < question2) //sort string ascending
            return -1;
        if (question1 > question2)
            return 1;
        return 0; //default return value (no sorting)
    });
}

// TODO: Remove this method and references
export const previousQuestion = (id, examData) => {
    return null;
}

// return element in array of object for given id
const findElementInArray = (arr, questionId) => {
    // Assuming ids are integers always
    let index = arr.findIndex(x => parseInt(x.id, 10) === parseInt(questionId, 10));
    console.log('answer to', arr[index])
    if (index === -1) {
        console.log('Not possible. Programmatical Bug exists.')
    }
    return arr[index];
}

// questions: questions data, responses: object question_id: choice  
export const computeScore = (questions, responses) => {
    if (responses === null) {
        return 0;
    }
    let attemptedQuestions = Object.keys(responses);
    return attemptedQuestions.reduce((acc, questionId) => {
        let question = findElementInArray(questions, questionId);
        if (responses['questionId'] !== null && question["correct answer"] === responses[questionId]) {
            return acc + parseInt(question["marks"], 10);
        }
        return acc;
    }, 0);
}

// return object section: score
export const computeIndividualScore = (questions, responses) => {
    if (responses === null) {
        return 0;
    }
    let uniqSections = uniqueSections(questions);
    uniqSections = uniqSections.reduce((acc, value) => ({ ...acc, ...{ [value]: 0 } }), {});
    let attemptedQuestions = Object.keys(responses);
    return attemptedQuestions.reduce((acc, questionId) => {
        let question = findElementInArray(questions, questionId);
        if (responses['questionId'] !== null && question["correct answer"] === responses[questionId]) {
            console.log('uiuiu',parseInt(question["marks"], 10));
            return { ...acc, ...{ [question["Section"]]: (acc[question["Section"]] + parseInt(question["marks"], 10)) } };
        }
        return acc;
    }, uniqSections);
};

