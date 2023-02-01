import React, { useState } from "react";
import { PostCard } from "../post-feed/PostCard";
import "./Profile.css";
import { Box, Button, Modal, Typography, IconButton, Tooltip} from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
//imports I need are react useState, useEffect
//probably useParam and useNavigate
const Profile: React.FC<any> = () => {
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

	//handles file submission - store?? am struggle here, too sleepy
	const [file, setFile] = useState("");
	const handleSubmit = () => setFile("");
	

	const profilestyle = {
		position: 'absolute' as 'absolute',
		transform: 'translate(200%, 240%)',
		width: 50
	};
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)', //left-right, up-down
		width: 400, //box size
		bgcolor: 'background.paper', //background within the box
		p: 4,
	};

	
	return (
		<div>
			<div className="profile-header">
				<div className="profile-picture">
					<Tooltip title="Change profile picture" placement="right-end">
					<IconButton type = "submit" sx={profilestyle}>
						<input 
							accept = "image/*"
							className="classes.input"
							style={{display: 'none'}}
							id="raised-button-file"
							multiple
							type="file"
						 	hidden/>
						<label htmlFor="raised-button-file">
							<AddCircleOutlinedIcon></AddCircleOutlinedIcon>
						</label>
					</IconButton>
					</Tooltip>
					{/* if we want to add a sort of preview portion, need to finish out this modal below*/}
					{/* <Modal
						open={open3}
						onClose={handleClose3}
						aria-labelledby="modal-uploadpfp-title"
						aria-describedby="modal-uploadpfp-desc"
					>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
							<Typography id="modal-uploadpfp-title" variant="h6" component="h2">
								Upload Picture
							</Typography>
							<Typography id="modal-uploadpfp-desc" sx={{ mt: 2 }}>
								Select an image
							</Typography>
							<Button
								type="submit"
								fullWidth
								sx={{ mt: 4, mb: 1 }}
							> Upload Image </Button>
						</Box>
					</Modal> */}
					{/* <Button sx={profilestyle}> </Button> */}
				</div>
				<div className="flex-column">
					<h2>Name Template Literal</h2>
					<p className="username">@'$username template literal'</p>
					
					<div className="flex-row">
						{/* <p className="followers">'$number tl' Followers</p>
						<p className="following">'$number tl' Following</p> */}
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
					<Button onClick={() => {alert('user followed')}} variant="outlined"  sx={{ml:35}}>Follow</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
