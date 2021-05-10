import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import './style.css'
import {makeStyles} from "@material-ui/core/styles";
import SuccessLoader from "./SuccessLoader";
import agent from "../../agent";
import {store} from "../../store";

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box'
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};

const useStyles = makeStyles(theme => ({
	dropzone: {
		opacity: "50%",
	},
	secondaryColor: {
		color: theme.palette.secondary.light,
	}
}));
function select(state) {
	return state.service
}

export default function Previews(props) {
	const classes = useStyles()
	const [files, setFiles] = useState([]);
	const [uploaded,setUploaded] = useState(false)
	const initStatus = {
		loading: false,
		success: false,
		error: false
	}
	const {fullName,fields,path,id} = select(store.getState());
	const serviceId = id;


	const [error,setError] =useState("");
	const [status, setStatus] = useState(initStatus)
	const [image,setImg] = useState(null)


	const {getRootProps, getInputProps} = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
		},
	});

	const handleSubmit = e => {
		setStatus({...status,loading:true})
		if (files.length === 1){
			let file = files[0];
			console.log(file);
			console.log(file.name)
			agent.Image.post(file).then((r) => {
				console.log(r)
					setError("");
					new Promise(r => setTimeout(r, 10)).then(() => {
					}).then(() => {
						return new Promise( async (resolve) => {
							let blob = await (await fetch(agent.Image.get(file.name,serviceId))).blob();
							let imgurl = URL.createObjectURL(blob);
							setUploaded(true);
							resolve(imgurl);
						}).then(r => {
							setImg(r);
							setStatus({...status,success:true,loading:false});
						}).catch(e => {
							setStatus({...status,error:true,errorMessage:e.message})
							new Promise(r => setTimeout(r, 5000)).then(() => {
								setStatus(initStatus);
							})
						});
					})
				}
			).catch(e => {
				setStatus({...status,error:true})
				setError(e.message);
				new Promise(r => setTimeout(r, 5000)).then(() => {
					setStatus(initStatus);
					setError("");
				})
			})
		}
		else {
			setError("You must upload a file");
			setStatus({...status,error:true,loading:false})
			new Promise(r => setTimeout(r, 2000)).then(() => {
				setStatus(initStatus);
				setError("");
			});
		}
	}

	const thumbs = files.map(file => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
					alt="image upload thumbnail"/>
			</div>
		</div>
	));

	useEffect(() => () => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files]);

	const Image = () => {
		if (image) {
			console.log(image)
			return <img src={image}  alt={"image"}/>
		} else {
			return <div></div>
		}

	}
	return (
		<section className="container">
			{!uploaded ? <React.Fragment>
			<div className={classes.dropzone} {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<p className={classes.secondaryColor}>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside style={thumbsContainer}>
				{thumbs}
			</aside> <SuccessLoader
					status={status}
					error={error}
					handleSubmit={handleSubmit}
					text={"Blur image"}
				/>
			</React.Fragment>
				:
			<Image/> }

		</section>
	);
}
