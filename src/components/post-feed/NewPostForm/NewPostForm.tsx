import { FiImage } from "react-icons/fi";
import "./NewPostForm.css";

const NewPostForm: React.FC<any> = () => {
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		alert("Create new post!");
	};

	const uploadImage = () => {
		alert("TODO: implement image upload");
	};

	return (
		<div className="newPostSection">
			<h2>Create Post</h2>
			<form className="newPostForm" onSubmit={handleSubmit}>
				<textarea placeholder="Write something amazing..."></textarea>
				<div className="flex-row space-between">
					<div className="newPostIcons">
						<FiImage onClick={uploadImage} />
					</div>
					<button className="newPostButton">Create Post</button>
				</div>
			</form>
		</div>
	);
};

export default NewPostForm;
