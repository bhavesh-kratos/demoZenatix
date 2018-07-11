import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css'; // for css refer to App.css
import PrivateRoute from './custom-routes/PrivateRoute'; // route only accessible when loggedin
import PublicRoute from './custom-routes/PublicRoute'; // route only accessible when not loggedin
import ExamScreen from './components/ExamScreen';
import LoginScreen from './components/LoginScreen';
import ShareScreen from './components/ShareScreen';

// const TestItem = () => <div>Testing.. </div>;

const App = () => (
  <div className="App">
    <Switch>
      <PublicRoute exact path ="/login" component={LoginScreen} />  
      <Route exact path ="/" component={ExamScreen} />  
      <PrivateRoute exact path ="/score" component={ShareScreen} />  
    </Switch>
  </div>
);

export default App;