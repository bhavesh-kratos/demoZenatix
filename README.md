1. clone the project.  
2. run npm install && npm start


Assumptions:
1. Its assumed that facebook api will return correct reponse object with same key value pairs as the time of writing this code on authorization, which is used to display user's content.
2. You have a proper working internet connection, as it requires internet for fb login, dropbox fetch and image share.
3. When user choose to logout, instead of actually removing user from we simply exit user from our app for the session.
4. In your dropBox file you have to keep the header contents same as specified in example file althought you can edit or add more content to excel sheet. But the type of data for each respective header(key) should be same. Example: you can add as many diferent type sections in excel sheets but one section each row as specified in example data.  
5. Name of the sections will be short maximum 10-12 characters long. 
6. User can't traverse from one route to another directly only way to it happens is by entering the link on address bar or by app itself as per the events.

Known Bugs but couldn't fix due to lack of time:
1. While debugging ui if you resize the viewport, you may find some abnormalities happening there, its becuase how the sidebar and the content in page gets repositioned when sidebar opens. To fix it refresh the screen for current view size. (./src/components/ExamScreen/Sidebar)   
2. In Ui part, inside the test sceen header the question action-icons(on right side) are not properly scaled as per the device.

UnknowBugs:
1. Downloading the chart and uploading to a host like imgur is not being done dues to some problem in base64 image generated through chart.js api.

incomplete features:
1. Ui fixes are still pending like adding Sections on the list in sidebar and showing finish button at the end question.

Config:
The configuration can be updated by changing values at './src/config/config'. 
Note: This project entirely depends on facebook to provide data(it slows down the app while starting the app) about whether user is authenticated or not on page refresh if you want to keep the user logged in, if he has authorized his credential set AUTO_LOGIN = true, else change it to false.


As of now code requires some refactoring and debugging.