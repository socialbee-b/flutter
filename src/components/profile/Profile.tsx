import React from "react";
import { useSelector } from "react-redux";
import UploadFile from "../../s3/UploadFile";
import { PostCard } from "../post-feed/PostCard";
import { getUser } from "../store/users.slice";
import "./Profile.css";

const Profile: React.FC<any> = () => {
	const user = useSelector(getUser);
	return (
		<div>
			<div className="profile-header">
				<div className="profile-picture">
					<img className="profile-picture" src={user?.imageUrl.split("\"")[1]} alt="Profile Image Here"/>
				</div>
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
