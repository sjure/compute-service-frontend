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
		new Promise( async (resolve) => {
			let res = await agent.Image.get(props.filename);
			console.log(res);
			resolve(res);
		}).then(r => {
			setImg(r);
			setStatus({...status,success:true,loading:false});
		}).catch(e => {
			setStatus({...status,error:true,errorMessage:e.message})
			new Promise(r => setTimeout(r, 5000)).then(() => {
				setStatus(initStatus);
			})
		});
	}
	const Image = () => {
		if (image) {
			return <img src={agent.Image.get(props.filename)}  alt={"image"}/>
		} else {
			return <div></div>
		}

	}

	
	return (
		<div>
			<Image/>
			<SuccessLoader
			status={status}
			error={status.errorMessage}
			handleSubmit={getImage}
			text={"Get new image"}
		/>
		</div>
	)
}