import React from "react";
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SuccessLoader(props) {
	if (props.status.loading) {
		return (
			<div><CircularProgress color={'secondary'}/></div>
		)
	} else if (props.status.success) {
		return (
			<Alert severity="success">
				<AlertTitle>Success</AlertTitle>
				Successfully saved
			</Alert>)
	} else if (props.status.error) {
		return (
			<Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				{props.error}
			</Alert>
		)
	}
	return <Button
		type="submit"
		id="standard-full-width"
		fullWidth
		variant="contained"
		color="secondary"
		label="submit"
		maring="normal"
		onClick={props.handleSubmit}>
		Save
	</Button>
}