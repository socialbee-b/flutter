import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import UploadFile from "../../s3/UploadFile";
import { getCurrentUser, getUser, getUserById } from "../store/users.slice";
import "./Profile.css";
import {
	Box,
	Button,
	Modal,
	Typography,
	IconButton,
	Tooltip,
} from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { fetchPosts, getPosts, getStatus } from "../store/posts.slice";
import PostCard from "../post-feed/PostCard";
import FollowingList from "./FollowingList";
import FollowersList from "./FollowersList";

const Profile: React.FC<any> = () => {
	const currentUser = useSelector(getCurrentUser);
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const status = useSelector(getStatus);

	//handles the toggle of the following modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//handles the toggle of the follower modal
	const [open2, setOpen2] = useState(false);
	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);

	//handles the toggle of upload profile modal - assuming that we choose that, if not, just delete
	const [open3, setOpen3] = useState(false);
	const handleOpen3 = () => setOpen3(true);
	const handleClose3 = () => setOpen3(false);

	// posts stuff
	const posts = useSelector(getPosts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []); // eslint-disable-line

	useEffect(() => {
		if (user?.id) {
			dispatch(getUserById(user?.id));
		}
	}, [user]); // eslint-disable-line

	useEffect(() => {
		if (status === "success") {
			dispatch(fetchPosts());
		}
	}, [status]); // eslint-disable-line

	const profilestyle = {
		position: "absolute" as "absolute",
		transform: "translate(-80%, 250%)",
		width: 50,
	};
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
		<div className="flex-column">
			<div className="profile-header">
				<div className="profile-picture">
					<img className="profile-picture" src={user?.imageUrl} alt="" />
					<Tooltip title="Change profile picture" placement="right-end">
						<IconButton onClick={handleOpen3} sx={profilestyle}>
							<AddCircleSharpIcon
								sx={{ fontSize: 25, color: "#0b3948" }}
							></AddCircleSharpIcon>
						</IconButton>
					</Tooltip>
					<Modal
						open={open3}
						onClose={handleClose3}
						aria-labelledby="modal-uploadpfp-title"
						aria-describedby="modal-uploadpfp-desc"
					>
						<Box sx={style}>
							<Typography
								className="prompt-container"
								id="modal-uploadpfp-title"
								variant="h6"
								component="h2"
							>
								Upload Picture
							</Typography>
							<Typography
								className="prompt-container"
								id="modal-uploadpfp-desc"
								sx={{ mt: 2 }}
							>
								Select an image
								<UploadFile />
							</Typography>
						</Box>
					</Modal>
				</div>
				<div className="flex-column">
					<h2>
						{user?.firstName} {user?.lastName}
					</h2>
					<p className="username">@{user?.username}</p>

					<div className="flex-row">
						<Button onClick={handleOpen}>
							{currentUser?.following?.length} Following
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
									<FollowingList/>
								</Typography>
							</Box>
						</Modal>

						<Button onClick={handleOpen2}>
							{currentUser?.followers?.length} Followers
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
									<FollowersList/>
								</Typography>
							</Box>
						</Modal>
					</div>
				</div>
			</div>
			<div className="flex-column column-reverse">
				{posts?.map(
					(post: any) =>
						post?.author?.id === user?.id && (
							<PostCard key={post?.id} post={post} />
						)
				)}
			</div>
		</div>
	);
};

export default Profile;
