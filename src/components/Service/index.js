import React, {useState} from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import Previews from "./image";
import Result from "./getResult";

export default function  ImageBlur(props) {
	const [uploaded, setUploaded] = useState(false);
	const [fileName,setFileName] = useState("");
	return (
		<Grid container direction={"row"}>
			<Grid item xs>
				<Typography variant={"h1"}>Image blur</Typography>
				<Typography variant={"h3"}>Drag and drop an image!</Typography>
				{uploaded ?
					<Result filename={fileName}/>:
					<Previews
						setFileName={setFileName}
						setUploaded={setUploaded}
				/>}
			</Grid>

		</Grid>
	)

}