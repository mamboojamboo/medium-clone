import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalFeed from './pages/globalFeed/GlobalFeed';
import Authentication from './pages/authentication/Authentication';
import Article from './pages/article/Article';

export default () => (
  <Switch>
    <Route path='/' component={GlobalFeed} exact />
    <Route path='/login' component={Authentication} exact />
    <Route path='/register' component={Authentication} exact />
    <Route path='/articles/:slug' component={Article}/>
  </Switch>
);
