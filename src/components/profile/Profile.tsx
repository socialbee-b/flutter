import React from "react";
import UploadFile from "../../s3/UploadFile";
import { PostCard } from "../post-feed/PostCard";
import "./Profile.css";

const Profile: React.FC<any> = () => {
	return (
		<div>
			<div className="profile-header">
				<div className="profile-picture"></div>
				<div className="flex-column">
					<h2>Username</h2>
					<p className="username">@username</p>
					<div className="flex-row">
						<p className="followers">123 Followers</p>
						<p className="following">123 Following</p>
						<UploadFile />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
