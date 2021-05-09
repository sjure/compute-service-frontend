import React,{useEffect} from "react";
import agent from "../agent";


export default function Services(props) {
	useEffect(() => {
		agent.Services.getALl().then((services) => {
			console.log(services)
		})
	},[])

	return <div></div>
}