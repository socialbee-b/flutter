import axios from "axios";
import { useRef } from "react";
import { FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { generateUploadURL } from "../../../s3/s3Config";
import { createPost, fetchPosts } from "../../store/posts.slice";
import { getUser } from "../../store/users.slice";
import { addToast } from "../../toasts/toasts.slice";
import "./NewPostForm.css";

const NewPostForm: React.FC<any> = () => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let imageUrl = "";

		// if there is a file
		if (fileRef?.current?.files && fileRef?.current?.files?.length > 0) {
			const fileName = fileRef.current?.files[0]?.name;
			const url = await generateUploadURL(user?.id, fileName);
			await axios.put(url, fileRef.current.files[0]);
			imageUrl = url.split("?")[0];
		}

		// create body from create-post endpoint
		const body = {
			author: { id: user?.id },
			text: textRef.current?.value,
			imageUrl,
			comments: [],
			postType: "Top",
		};

		try {
			// hit create-post endpoint
			dispatch(createPost(body));

			// on success, clear the form
			if (formRef.current !== null) {
				formRef.current.reset();
			}

			// send message to user
			dispatch(
				addToast({
					status: "success",
					message: "Your post has been created!",
				})
			);

			// update posts
			dispatch(fetchPosts());
		} catch (err: any) {
			// on failure notify user
			dispatch(
				addToast({
					status: "error",
					message: "Unable to create a post.",
				})
			);
		}
	};

	return (
		<div className="newPostSection">
			<h2>Create Post</h2>
			<form ref={formRef} className="newPostForm" onSubmit={handleSubmit}>
				<textarea
					ref={textRef}
					placeholder="Write something amazing..."
				></textarea>
				<div className="flex-row space-between">
					<div className="newPostIcons">
						<label htmlFor="postFileUpload">
							<FiImage />
						</label>
						<input
							id="postFileUpload"
							className="hiddenInput"
							ref={fileRef}
							type="file"
						/>
					</div>
					<button className="newPostButton">Create Post</button>
				</div>
			</form>
		</div>
	);
};

export default NewPostForm;
