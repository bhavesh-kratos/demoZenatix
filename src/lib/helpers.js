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

export const groupedBySection = (examData) => {
    if (typeof examData === 'undefined' || examData === null) {
        return null;
    }
    let uniqueSections = [...new Set(examData.map(item => item.Section))];
    console.log(uniqueSections);
    //questions grouped based on sections
    return uniqueSections.map(section => {
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

export const previousQuestion = (id, examData) => {
    return 
}