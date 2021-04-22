import React from 'react';
import {Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles( () => ({
		banner: {
			background: "#286086"

		}
	}
))

const Banner = ({appName, token}) => {
	const styles = useStyles();
	if (token) {
		return null;
	}
	return (
		<Container fixed>
			<div className={styles.banner}>
				<div >
					<h1 >
						{appName.toLowerCase()}
					</h1>
					<p>{"Cloud computing near you"}</p>
				</div>
			</div>
		</Container>
	);
};

export default Banner;
