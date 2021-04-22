import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import Previews from "./image";

const useStyles = makeStyles(() => ({
	button: {
	}
}))

export default function ImageBlur(props) {
	const styles = useStyles()
	return (
		<Grid container direction={"row"} >
			<Grid item xs>
				<Typography variant={"h1"}>Image blur</Typography>
				<Typography  variant={"h3"} >Drag and drop an image!</Typography>
				<Previews/>
			</Grid>

		</Grid>
	)

}