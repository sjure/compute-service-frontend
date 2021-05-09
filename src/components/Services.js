import React, {useEffect, useState} from "react";
import agent from "../agent";
import {Grid} from "@material-ui/core";


export default function Services(props) {
	const [services,setServices] = useState([])

	useEffect(() => {
		agent.Services.getALl().then((services) => {
			console.log(services)
			setServices(services)
		})
	},[])

	const ServiceList = () => {
		return services.map((svc,index) => {
			return <Grid item xs key={index} >
				{svc.name}
			</Grid>
		})
	}

	return (
		<Grid container dir={"column"}>
		<ServiceList/>
	</Grid>
	)
}