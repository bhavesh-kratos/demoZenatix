import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css'; // for css refer to App.css
import PrivateRoute from './custom-routes/PrivateRoute';
import PublicRoute from './custom-routes/PublicRoute';
import ExamScreen from './components/ExamScreen';

// const TestItem = () => <div>Testing.. </div>;

const App = () => (
  <div className="App">
    <Switch>
      <Route path ="/" component={ExamScreen} />  
    </Switch>
  </div>
);

export default App;