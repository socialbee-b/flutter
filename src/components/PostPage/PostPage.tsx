import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SinglePostCard from "../post-feed/NewPostForm/SinglePostCard";
import { fetchPostById, getCurrentPost, getStatus } from "../store/posts.slice";

const PostPage: React.FC<any> = () => {
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const post = useSelector(getCurrentPost);
	const status = useSelector(getStatus);

	useEffect(() => {
		dispatch(fetchPostById(id));
	}, []);

	useEffect(() => {
		if (status === "rejected") {
			navigate(-1);
		}
	}, [status]);

	return (
		<>
			{status === "success" ? (
				<SinglePostCard post={post} />
			) : (
				<h2>Loading...</h2>
			)}
		</>
	);
};

export default PostPage;
