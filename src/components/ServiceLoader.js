import React, {useEffect, useState} from "react";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {theme} from "../theme";
import {useParams} from "react-router-dom";
import agent from "../agent";
import {store} from "../store";
import {SERVICE_SELECTED} from "../constants/actionTypes";


const useStyle = makeStyles(theme => ({
	svc: {
		padding:20+ "px",
	},
	topSvcCont: {
		paddingTop: 20 +"px"
	}
}))

export  function Services(props) {
	const classes = useStyle(theme)
	let { service } = useParams();

	useEffect(() => {
		agent.Services.getService(service).then((services) => {
			console.log(services)
			store.dispatch({type:SERVICE_SELECTED,payload:services})

		})
	},[])
	console.log(service)
	console.log("-------------------------------------------------")

	return (
		<Grid container spacing={2} alignItems={"center"} dir={"column"}>
			<Grid item xs>
				<Typography variant={"h1"} >{service}</Typography>
			</Grid>
		</Grid>
	)
}