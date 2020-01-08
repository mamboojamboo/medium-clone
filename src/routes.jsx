import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalFeed from './pages/globalFeed/GlobalFeed';
import Article from './pages/article/Article';

export default () => (
  <Switch>
    <Route path='/' component={GlobalFeed} exact />
    <Route path='/articles/:slug' component={Article}/>
  </Switch>
);
