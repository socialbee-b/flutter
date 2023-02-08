import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic, getUser } from "../components/store/users.slice";
import { generateUploadURL } from "./s3Config";
import "./UploadFile.css";

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const UploadFile: React.FC<any> = () => {
	const user = useSelector(getUser);
	const [selectedFile, setSelectedFile] = useState(null);
	const dispatch = useDispatch<any>();

	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	};

	const uploadFile = async (file: any) => {
		// All axios request here
		console.log(file);
		const url = await generateUploadURL(user?.id, file.name);
		console.log(url);
		await axios.put(url, file);
		const imageUrl = url.split("?")[0];
		console.log(imageUrl);
		dispatch(
			changeProfilePic({
				id: user?.id,
				imageUrl: imageUrl,
			})
		);
	};
	return (
		<div>
			<label htmlFor="file-button">
				<input
					style={{ display: "none" }}
					id="file-button"
					name="file-button"
					type="file"
					hidden
					onChange={handleFileInput}
				/>
				<Button
					component="span"
					fullWidth
					sx={{ mt: 1, mb: 1 }}
				>
					Choose File
				</Button>
				<div className="fileName-center">{(selectedFile as any)?.name}</div>
				<Button
					onClick={() => uploadFile(selectedFile)}
					fullWidth
					sx={{ mt: 1, mb: 1 }}
				>
					Upload Image
				</Button>
			</label>
		</div>
	);
};

export default UploadFile;
