import auth from './reducers/auth';
import {combineReducers} from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import service from './reducers/service';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
	auth,
	common,
	home,
	profile,
	settings,
	service,
	router: routerReducer
});
