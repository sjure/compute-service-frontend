import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import agent from "../../agent";

export default function Result(props) {
	const [image,setImg] = useState(null)
	const initStatus = {
		loading: false,
		success: false,
		error: false
	}
	const getImage = async  () => {
		setImg(await agent.Image.get(props.filename));
	}
	if (image) {
		return <img src={agent.Image.get(props.filename)}  alt={"image"}/>
	}
	

	return <Button onClick={getImage} fullWidth>Get new image</Button>
}