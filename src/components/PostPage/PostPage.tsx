import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import SinglePostCard from "../post-feed/NewPostForm/SinglePostCard";
import { fetchPostById, getStatus } from "../store/posts.slice";

const PostPage: React.FC<any> = () => {
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const status = useSelector(getStatus);

	useEffect(() => {
		dispatch(fetchPostById(id));
	}, []); // eslint-disable-line

	useEffect(() => {
		if (status === "rejected") {
			navigate(-1);
		}
	}, [status]); // eslint-disable-line

	return <>{status === "success" ? <SinglePostCard /> : <h2>Loading...</h2>}</>;
};

export default PostPage;
