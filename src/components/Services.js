import React, {useEffect, useState} from "react";
import agent from "../agent";
import {Grid, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {theme} from "../theme";

const useStyle = makeStyles(theme => ({
	svc: {
		padding:20+ "px",
	},
	topSvcCont: {
		paddingTop: 20 +"px"
	}
}))

export default function Services(props) {
	const [services,setServices] = useState([])
	const classes = useStyle(theme)

	useEffect(() => {
		agent.Services.getALl().then((services) => {
			console.log(services)
			setServices(services)
		})
	},[])

	const ServiceList = () => {
		return services.map((svc,index) => {
			return <Grid item xs key={index} >
				<Button color={"primary"} className={classes.svc} variant="contained" onClick={() => console.log("yes")}>{svc.name}</Button>
			</Grid>
		})
	}

	return (
		<Grid container dir={"column"} className={classes.topSvcCont} spacing={2}>
		<ServiceList/>
	</Grid>
	)
}