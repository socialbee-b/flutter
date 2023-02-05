import { useSelector } from "react-redux";
import React, { useState } from "react";
// import { PostCard } from "../post-feed/PostCard";
import { getUser } from "../store/users.slice";
import "./Profile.css";
import { Box, Button, Modal, Typography } from "@mui/material";

const NotUserProfile: React.FC<any> = () => {
	const user = useSelector(getUser);
	//handles the toggle of the following modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//handles the toggle of the follower modal
	const [open2, setOpen2] = useState(false);
	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)", //left-right, up-down
		width: 400, //box size
		bgcolor: "background.paper", //background within the box
		p: 4,
	};

	// fake card so that I had something to work from while there are no posts from any users
	const item = {
		id: 2,
		text: "some text",
		imageUrl: "",
		comments: [],
		author: {
			firstName: "Charlotte",
		},
		postType: "Top",
	};

	return (
		<div>
			<div className="profile-header">
				<div className="profile-picture">
					<img
						className="profile-picture"
						src={user?.imageUrl}
						alt="Profile Image Here"
					/>
				</div>
				<div className="flex-column">
					<h2>
						{user?.firstName} {user?.lastName}
					</h2>
					<p className="username">@{user?.username}</p>

					<div className="flex-row">
						<Button onClick={handleOpen}>321 Following</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Following
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									list of following goes here!
								</Typography>
							</Box>
						</Modal>

						<Button onClick={handleOpen2}>123 Followers</Button>
						<Modal
							open={open2}
							onClose={handleClose2}
							aria-labelledby="modal-modal-title2"
							aria-describedby="modal-modal-description2"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title2" variant="h6" component="h2">
									Followers
								</Typography>
								<Typography id="modal-modal-description2" sx={{ mt: 2 }}>
									list of followers goes here!
								</Typography>
							</Box>
						</Modal>
					</div>
				</div>
				<div className="follow-button">
					<Button
						onClick={() => {
							alert("user followed");
						}}
						variant="outlined"
						sx={{ ml: 55 }}
					>
						Follow
					</Button>
				</div>
			</div>
			<div>{/* <PostCard post={item} key={item.id} /> */}</div>
		</div>
	);
};

export default NotUserProfile;