import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar'


function Post({ username, caption, imageUrl }) {
	return (
		<div className="post container-fluid ">
			<div className="post_header">
				<Avatar
					className="post_avatar"
					alt="Vic"
					src={"https://i.ibb.co/Ss9stCF/logo.webp"}
				/>

				<h3>{username}</h3>
			</div>



			{/* header > avatar > username */}

			<img className="post_img " src={imageUrl} alt="" />
			{/* img */}
			<h4 className="post_text"> <strong> {username} </strong> : {caption} </h4>
			{/* username > caption */}
		</div>
	)
}

export default Post
