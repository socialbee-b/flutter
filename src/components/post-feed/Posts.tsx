import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts, getStatus } from "../store/posts.slice";
import PostCard from "./PostCard";

const Posts: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const posts = useSelector(getPosts);
	const status = useSelector(getStatus);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	useEffect(() => {
		if (status === "success") {
			dispatch(fetchPosts());
		}
	}, [status]);

	return (
		<div className="reversedPosts">
			{posts?.map((post: any) => (
				<PostCard key={post?.id} post={post} />
			))}
		</div>
	);
};

export default Posts;
