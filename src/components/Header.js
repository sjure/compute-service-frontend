import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

const LoggedOutView = props => {
	const classes = useStyles();
	if (!props.currentUser) {
		return (
			<React.Fragment>
				<Typography variant="h6" className={classes.title}>
					<Link to="/" className="nav-link">
						Home
					</Link>
				</Typography>
				<Typography variant="h6" className={classes.title}>
					<Link to="/login" className="nav-link">
						Sign in
					</Link>
				</Typography>
				<Typography variant="h6" className={classes.title}>

					<Link to="/register" className="nav-link">
						Sign up
					</Link>
				</Typography>
			</React.Fragment>
		);
	}
	return null;
};

const LoggedInView = props => {
	if (props.currentUser) {
		return (
			<React.Fragment>

				<Typography variant="h6">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</Typography>


				<Link to="/editor" className="nav-link">
					<i className="ion-compose"></i>&nbsp;New Post
				</Link>


				<Link to="/settings" className="nav-link">
					<i className="ion-gear-a"></i>&nbsp;Settings
				</Link>

				<Link
					to={`/@${props.currentUser.username}`}
					className="nav-link">
					<img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username}/>
					{props.currentUser.username}
				</Link>

			</React.Fragment>
		);
	}

	return null;
};


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));


function Header(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>

				<Typography variant="h5" className={classes.title}>
					<Link to="/" className="navbar-brand">
						{props.appName.toLowerCase()}
					</Link>
				</Typography>

					<LoggedOutView currentUser={props.currentUser}/>

					<LoggedInView currentUser={props.currentUser}/>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
