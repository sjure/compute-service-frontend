import React, {useEffect, useState} from "react";
import {CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import {theme} from "../theme";
import {useParams} from "react-router-dom";
import agent from "../agent";
import {store} from "../store";
import {SERVICE_SELECTED} from "../constants/actionTypes";
import Service from "./Service";


const useStyle = makeStyles(theme => ({
	svc: {
		padding:20+ "px",
	},
	topSvcCont: {
		paddingTop: 20 +"px"
	}
}))

function select(state) {
	return state.service
}

export  function Services(props) {
	const classes = useStyle(theme)
	const [isLoaded,setLoaded] = useState(false)
	let { service } = useParams();
	const {fullName,fields,path} = select(store.getState());


	useEffect(() => {
		agent.Services.getService(service).then((services) => {
			store.dispatch({type:SERVICE_SELECTED,payload:services})
			setLoaded(true)
		})
	},[])

	if (!isLoaded) {
		return <CircularProgress color="secondary" />
	}else {
		return (
			<Grid container spacing={2} alignItems={"center"} dir={"column"}>
				<Grid item xs>
					<Typography color={"secondary"} variant={"h3"}>{fullName}</Typography>
					<Service/>
				</Grid>
			</Grid>
		)
	}
}