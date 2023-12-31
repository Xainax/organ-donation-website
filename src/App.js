import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './components/HomePage';
import UserSignup from './components/UserSignup';
import OrganAvailability from './components/OrganAvailability';
import CreateAccount from './components/CreateAccount';
import OrganRequest from './components/OrganRequest';
import Donor from './components/Donor';
import Recipient from './components/Recipient'
import OrganPriority from './components/OrganPriority'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={UserSignup}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/availability" component={OrganAvailability}/>
        <Route path="/signup" component={CreateAccount}/>
        <Route path="/request" component={OrganRequest}/>
        <Route path="/donors" component={Donor}/>
        <Route path="/recipients" component={Recipient}/>
        <Route path="/priority" component={OrganPriority}/>
      </Switch>
    </Router>
  );
}

export default App;