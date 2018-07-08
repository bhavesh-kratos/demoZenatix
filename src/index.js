import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';



const store = configureStore();

// const authToken = localStorage.getItem('auth_token');
// const userId = localStorage.getItem('user_id');
// console.log("auth", authToken)
// if (!isNil(authToken) && !isNil(userId)) {
//   const authToken = localStorage.getItem('auth_token');
//   const userId = localStorage.getItem('user_id');
//   const userInfoJson = localStorage.getItem('user_info');
//   console.log('entered', authToken, userId);
//   let userInfo;
//   try {
//     userInfo = JSON.parse(userInfoJson);
//   } catch (e) {
//     userInfo = {};
//   }
//   setAuthorizationHeader(authToken, userId);
//   console.log("auth", authToken)
//   store.dispatch(
//     signIn.success({
//       auth_token: authToken,
//       user_id: userId,
//       user_info: userInfo
//     })
//   );
// }

const app = (
  <Provider store={store}>
    <BrowserRouter basename={'/'}>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();