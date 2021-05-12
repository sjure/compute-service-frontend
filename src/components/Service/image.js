import React, {useEffect} from "react";
import {useDropzone} from "react-dropzone";
import './style.css'
import {makeStyles} from "@material-ui/core/styles";

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
		height: 200 + "px",
	},
	secondaryColor: {
		color: theme.palette.secondary.light,
	}
}));


export default function Previews(props) {
	const classes = useStyles()
	const {files, setFiles} = props;

	const {getRootProps, getInputProps} = useDropzone({
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => {
				return Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			}));
		},
	});


	const thumbs = files.map(file => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
					alt={`upload ${file.name}`}/>
			</div>
		</div>
	));

	useEffect(() => () => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files]);

	return (
		<section className="container">
			<React.Fragment>
				<div className={classes.dropzone} {...getRootProps({className: 'dropzone'})}>
					<input {...getInputProps()} />
					<p className={classes.secondaryColor}>{props.helperText}</p>
				</div>
				<aside style={thumbsContainer}>
					{thumbs}
				</aside>
			</React.Fragment>
		</section>
	);
}
