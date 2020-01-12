import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalFeed from './pages/globalFeed/GlobalFeed';
import Authentication from './pages/authentication/Authentication';
import Article from './pages/article/Article';
import TagFeed from './pages/tagFeed/TagFeed';
import YourFeed from './pages/yourFeed/YourFeed';
import CreateArticle from './pages/createArticle/CreateArticle';
import EditArticle from './pages/editArticle/EditArticle';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/userProfile/UserProfile';

export default () => (
  <Switch>
    <Route path='/' component={GlobalFeed} exact />
    <Route path='/profiles/:slug' component={UserProfile} />
    <Route path='/profiles/:slug/favorites' component={UserProfile} />
    <Route path='/settings' component={Settings} />
    <Route path='/feed' component={YourFeed}/>
    <Route path='/tags/:slug' component={TagFeed}/>
    <Route path='/login' component={Authentication}/>
    <Route path='/register' component={Authentication}/>
    <Route path='/articles/:slug' component={Article}/>
    <Route path='/article/new' component={CreateArticle}/>
    <Route path='/article/:slug/edit' component={EditArticle}/>
  </Switch>
);
