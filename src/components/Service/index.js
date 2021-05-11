import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import Previews from "./image";

export default function ImageBlur(props) {
	return (
		<Grid container direction={"row"}>
			<Grid item xs>
				<Typography variant={"h3"}>Drag and drop an image!</Typography>
				<Previews/>
			</Grid>

		</Grid>
	)

}