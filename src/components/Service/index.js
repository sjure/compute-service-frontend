import React, {useState} from 'react';
import {Grid, TextField} from "@material-ui/core";
import Previews from "./image";
import {APP_LOAD, REDIRECT} from "../../constants/actionTypes";
import {connect} from 'react-redux';
import agent from "../../agent";
import SuccessLoader from "./SuccessLoader";

const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
		dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
	onRedirect: () =>
		dispatch({type: REDIRECT})
});

const mapStateToProps = state => {
	return {
		service: state.service
	}
};


function Service(props) {
	const initStatus = {
		loading: false,
		success: false,
		error: false
	}
	const {fullName, fields, path, id,fileOutput} = props.service;
	const serviceId = id;
	const [uploaded, setUploaded] = useState(false)
	const [values, setValues] = useState({});
	const [error, setError] = useState("");
	const [status, setStatus] = useState(initStatus)
	const [image, setImg] = useState(null)
	const [textRes,setTextRes] = useState("");
	const [files, setFiles] = useState([]);


	const Inputs =  ({fields, values, files, setFiles}) => {
		return Object.values(fields).filter(x => x.input).map((el, i) => {
			if (el.type === "text") {
				const val = Object.keys(values).indexOf(el.name) > -1 ? values[el.name] : "";
				return (
					<Grid item xs key={i}>
						<TextField id="standard-basic" name={el.name} label={el.fullName} type="text" value={val}
											 onChange={handleChange}/>
					</Grid>
				)
			} else if (el.type === "file") {
				return (
					<Grid item xs key={i}>
						<Previews
							files={files}
							helperText={"Drop a " + el.type + " of type " + el.format}
							setFiles={setFiles}
						/>
					</Grid>
				)
			} else {
				console.error(el)
			}
		})
	}

	function handleChange(event) {
		setStatus({...status,error:false})
		let {name, value} = event.target;
		setValues({...values, [name]: value});
	}


	const handleSubmit = e => {
		e.preventDefault();
		setStatus({...status, loading: true})
		let undefinedFields = Object.values(fields)
			.filter(x=>x.type !== "file")
			.filter(x => Object.keys(values).indexOf(x.name) === -1 || values[x.name] === "")
			.length
		if (undefinedFields){
			setStatus({...status, loading: false,error:true})
			setError("Fill out every field")
			return
		} else {
			setStatus({...status,error:false})
		}
		let query = ""
		Object.values(fields)
			.filter(x=>x.type !== "file")
			.forEach(x => {
				query += x.name + "=" +values[x.name] + "&"
			})

		console.log(query)
		if (Object.values(fields).filter(x => x.type === "file").length) {
			if (files.length === 1) {
				let file = files[0];
				console.log(file);
				console.log(file.name)
				agent.Image.post(file).then((r) => {
						console.log(r)
						setError("");
						if (!fileOutput) {
							return new Promise(r => setTimeout(r, 10)).then(() => {
								return new Promise(async (resolve) => {
									let res = await fetch(agent.Image.get(serviceId,query), {headers: {"authorization": `Token ${agent.Token.getToken()}`}});
									setUploaded(true);
									let js = await res.json()
									console.log(js)
									setTextRes(js)
									return
								}).then(r => {
									setStatus({...status, success: true, loading: false});
								}).catch(e => {
									setStatus({...status, error: true, errorMessage: e.message})
									return new Promise(r => setTimeout(r, 5000)).then(() => {
										setStatus(initStatus);
									})
								});
							})
						}
						return new Promise(r => setTimeout(r, 10)).then(() => {
						}).then(() => {
							return new Promise(async (resolve) => {
								let blob = await (await fetch(agent.Image.get(serviceId,query), {headers: {"authorization": `Token ${agent.Token.getToken()}`}})).blob();
								let imgurl = URL.createObjectURL(blob);
								setUploaded(true);
								resolve(imgurl);
							}).then(r => {
								setImg(r);
								setStatus({...status, success: true, loading: false});
							}).catch(e => {
								setStatus({...status, error: true, errorMessage: e.message})
								new Promise(r => setTimeout(r, 5000)).then(() => {
									setStatus(initStatus);
								})
							});
						})
					}
				).catch(e => {
					setStatus({...status, error: true})
					setError(e.message);
					new Promise(r => setTimeout(r, 5000)).then(() => {
						setStatus(initStatus);
						setError("");
					})
				})
			} else {
				setError("You must upload a file");
				setStatus({...status, error: true, loading: false})
				new Promise(r => setTimeout(r, 2000)).then(() => {
					setStatus(initStatus);
					setError("");
				});
			}
		} else {

		}
	}

	const Image = () => {
		if (image) {
			console.log(image)
			return <img src={image} alt={"image"}/>
		} else {
			return <div></div>
		}
	}

	const TexEl = () => {
		if (textRes) {
			return <p>{textRes}</p>
		} else {
			return <div></div>
		}
	}
	const Result = () => {
		if (fileOutput) {
			return <Image/>
		} else {
			return <TexEl/>
		}
	}
	return (
		<div>
			{!uploaded ?
				<React.Fragment>
					<form onSubmit={handleSubmit}>
						<Grid container direction={"row"} spacing={2} alignItems={"center"}>
							{Inputs({fields, values, files, setFiles})}
						</Grid>
					</form>
					<SuccessLoader
						status={status}
						error={error}
						handleSubmit={handleSubmit}
						text={fullName}
					/></React.Fragment>
				:
				<Result/>}
		</div>
	)
}

export default connect(mapStateToProps)(Service)