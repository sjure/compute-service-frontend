import article from './reducers/article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import service from './reducers/service';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  home,
  profile,
  settings,
  service,
  router: routerReducer
});
