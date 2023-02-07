import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCurrentUser, getUserById } from "../store/users.slice";
import "./Profile.css";
import { Box, Button, Modal, Typography } from "@mui/material";
import FollowingList from "./FollowingList";
import FollowersList from "./FollowersList";
import PostCard from "../post-feed/PostCard";
import { useParams } from "react-router";
import { fetchPosts, getPosts } from "../store/posts.slice";

const NotUserProfile: React.FC<any> = () => {
	const { id } = useParams();
	const selectedUser = useSelector(getCurrentUser);
	const posts = useSelector(getPosts);
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(getUserById(id));
		dispatch(fetchPosts());
	}, []); // eslint-disable-line

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

	return (
		<div>
			<div className="profile-header">
				<div className="profile-picture">
					<img
						className="profile-picture"
						src={selectedUser?.imageUrl}
						alt="profile pic"
					/>
				</div>
				<div className="flex-column">
					<h2>
						{selectedUser?.firstName} {selectedUser?.lastName}
					</h2>
					<p className="username">@{selectedUser?.username}</p>

					<div className="flex-row">
						<Button onClick={handleOpen}>
							{selectedUser?.following?.length} Following
						</Button>
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
									{/* list of following goes here! */}
									<FollowingList user={selectedUser} />
								</Typography>
							</Box>
						</Modal>

						<Button onClick={handleOpen2}>
							{selectedUser?.followers?.length} Followers
						</Button>
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
									{/* list of followers goes here! */}
									<FollowersList user={selectedUser}/>
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
			<div className="flex-column column-reverse">
				{posts?.map(
					(post: any) =>
						post?.author?.id === selectedUser?.id && (
							<PostCard key={post?.id} post={post} />
						)
				)}
			</div>
		</div>
	);
};

export default NotUserProfile;
