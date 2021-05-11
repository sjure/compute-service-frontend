import Banner from './Banner';
import React from 'react';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ServiceList from "../ServiceList";
import {Typography} from "@material-ui/core";

const Promise = global.Promise;

const mapStateToProps = state => ({
	...state.home,
	appName: state.common.appName,
	token: state.common.token
});


const NotSignedIn = () => {
	return <Typography variant={"h3"}>{"You are not signed in, please sign in to use the services."}</Typography>
}

class Home extends React.Component {


	render() {
		return (
			<div className="home-page">
				<CssBaseline/>

				<Banner token={this.props.token} appName={this.props.appName}/>

				<div className="container page">
					<div className="row">
						{this.props.currentUser ? <ServiceList/> : <NotSignedIn/>}
					</div>
				</div>

			</div>
		);
	}
}

export default connect(mapStateToProps)(Home);
