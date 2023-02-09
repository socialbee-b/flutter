import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts";

export const PostFeed = () => {
	return (
		<div className="flex-column">
			<NewPostForm />
			<Posts />
		</div>
	);
};
export default PostFeed;
