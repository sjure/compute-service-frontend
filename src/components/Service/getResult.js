import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import agent from "../../agent";
import SuccessLoader from './SuccessLoader';

export default function Result(props) {
	const [image,setImg] = useState(null)
	const initStatus = {
		loading: false,
		success: false,
		error: false,
		errorMessage:""
	}
	const [status,setStatus] = useState(initStatus);
	const getImage =  () => {
		setStatus({...status,loading:true})

	}


	
	return (
		<div>

			<SuccessLoader
			status={status}
			error={status.errorMessage}
			handleSubmit={getImage}
			text={"Get new image"}
		/>
		</div>
	)
}