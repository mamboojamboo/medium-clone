import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import TopBar from './components/topBar/TopBar';
import Routes from './routes';
import { CurrentUserProvider } from './contexts/currentUser';
import CurrentUserChecker from './components/currentUserChecker/CurrentUserChecker';


const App = () => (
  <CurrentUserProvider>
    <CurrentUserChecker>
      <Router>
        <TopBar/>
        <Routes/>
      </Router>
    </CurrentUserChecker>
  </CurrentUserProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
