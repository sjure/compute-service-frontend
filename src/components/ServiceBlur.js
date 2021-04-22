import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

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

				<Button variant="contained" color="primary" onClick={() => console.log("Blur")}> Blur image</Button>
			</Grid>

		</Grid>
	)

}