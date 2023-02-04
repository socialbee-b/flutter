import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "../store/posts.slice";
import PostCard from "./PostCard";

const Posts: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const posts = useSelector(getPosts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	return (
		<>
			{posts?.map((post: any) => (
				<PostCard key={post?.id} post={post} />
			))}
		</>
	);
};

export default Posts;
