import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import storage from "./firebase"
import firebase from "./firebase"
import db from "./firebase"



function ImageUpload({ username }) {
	const [image, setImage] = useState(null)
	const [progress, setProgress] = useState(0)
	const [caption, setCaption] = useState('')

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	}
	const handleUpload = () => {
		const uploadTask = storage.storage.ref(`images/${image}`).put(image);


		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// progress
				const progress = Math.round(
					(snapshot.bytesTransffered / snapshot.totalBytes) * 100
				);
				setProgress(progress)
			},
			(error) => {
				// error
				console.log(error);
				alert(error.message);
			},
			() => {
				// complete
				storage.storage.ref("images").child(image.name).getDownloadURL().then(url => {
					db.db.collection("posts").add({
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						caption: caption,
						imageUrl: url,
						username: username
					});

					setProgress(0);
					setCaption("");
					setImage(null);
				})
			}
		)
	}
	return (
		<div className="imageupload">
			{/* Caption input */}

			{/* File Piker */}
			{/* Post button */}
			<progress className="imageUpload_Progress" value={progress} max="100"></progress>
			<input placeholder="Enter a Caption..." type="text" onchange={e => setCaption(e.target.value)} />

			<input type="file" onchange={handleChange} />
			{/* 
			<Dropzone onDrop={handleUpload}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone> */}
			<Button onClick={handleUpload}>
				Upload
			</Button>
		</div>
	)
}

export default ImageUpload
