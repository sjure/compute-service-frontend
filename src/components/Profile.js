import React from 'react';
import {Link} from 'react-router-dom';
import agent from '../agent';
import {connect} from 'react-redux';
import {FOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED, UNFOLLOW_USER} from '../constants/actionTypes';

const EditProfileSettings = props => {
	if (props.isUser) {
		return (
			<Link
				to="/settings"
				className="btn btn-sm btn-outline-secondary action-btn">
				<i className="ion-gear-a"></i> Edit Profile Settings
			</Link>
		);
	}
	return null;
};




const mapStateToProps = state => ({
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile
});

const mapDispatchToProps = dispatch => ({
	onFollow: username => dispatch({
		type: FOLLOW_USER,
		payload: agent.Profile.follow(username)
	}),
	onLoad: payload => dispatch({type: PROFILE_PAGE_LOADED, payload}),
	onUnfollow: username => dispatch({
		type: UNFOLLOW_USER,
		payload: agent.Profile.unfollow(username)
	}),
	onUnload: () => dispatch({type: PROFILE_PAGE_UNLOADED})
});

class Profile extends React.Component {
	componentWillMount() {
		this.props.onLoad(Promise.all([
			agent.Profile.get(this.props.match.params.username),
			agent.Articles.byAuthor(this.props.match.params.username)
		]));
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	renderTabs() {
		return (
			<ul className="nav nav-pills outline-active">
				<li className="nav-item">
					<Link
						className="nav-link active"
						to={`/@${this.props.profile.username}`}>
					</Link>
				</li>

			</ul>
		);
	}

	render() {
		const profile = this.props.profile;
		if (!profile) {
			return null;
		}

		const isUser = this.props.currentUser &&
			this.props.profile.username === this.props.currentUser.username;

		return (
			<div className="profile-page">

				<div className="user-info">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-10 offset-md-1">

								<img src={profile.image} className="user-img" alt={profile.username}/>
								<h4>{profile.username}</h4>
								<p>{profile.bio}</p>

								<EditProfileSettings isUser={isUser}/>

							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">

						<div className="col-xs-12 col-md-10 offset-md-1">

							<div className="articles-toggle">
								{this.renderTabs()}
							</div>

						</div>

					</div>
				</div>

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export {Profile, mapStateToProps};
