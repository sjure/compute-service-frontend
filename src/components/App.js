import agent from '../agent';
import Header from './Header';
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, REDIRECT} from '../constants/actionTypes';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Settings from '../components/Settings';
import {store} from '../store';
import {push} from 'react-router-redux';
import {Services} from "./ServiceLoader";
import {makeStyles} from "@material-ui/core";

const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		currentUser: state.common.currentUser,
		redirectTo: state.common.redirectTo
	}
};

const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
		dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
	onRedirect: () =>
		dispatch({type: REDIRECT})
});

class App extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			// this.context.router.replace(nextProps.redirectTo);
			store.dispatch(push(nextProps.redirectTo));
			this.props.onRedirect();
		}
	}

	componentWillMount() {
		const token = window.localStorage.getItem('jwt');
		if (token) {
			agent.setToken(token);
		}

		this.props.onLoad(token ? agent.Auth.current() : null, token);
	}

	render() {
		if (this.props.appLoaded) {
			return (
				<div style={{backgroundColor: '#c9e7ff',height:'100vh'}}>
					<Header
						appName={this.props.appName}
						currentUser={this.props.currentUser}/>
					<Switch>
						<Route exact path="/" render={() => <Home currentUser={this.props.currentUser}/>}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
						<Route path="/settings" component={Settings}/>
						<Route path="/@:username" component={Profile}/>
						<Route path="/services/:service" render={() => <Services/>}/>
					</Switch>
				</div>
			);
		}
		return (
			<div>
				<Header
					appName={this.props.appName}
					currentUser={this.props.currentUser}/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
