import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import agent from "../../agent";

export default function Result(props) {
	const [image,setImg] = useState(null)
	
	const getImage = async  () => {
		 await agent.Image.get(props.filename);
	}
	return <img src={agent.Image.get(props.filename)}  alt={"image"}/>
	if (image) {
		return <img src={agent.Image.get(props.filename)}  alt={"image"}/>
	}

	return <Button onClick={getImage} fullWidth>Get new image</Button>
}