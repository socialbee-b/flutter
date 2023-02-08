import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts, getStatus } from "../store/posts.slice";
import { getCurrentUser } from "../store/users.slice";
import PostCard from "./PostCard";

const Posts: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const posts = useSelector(getPosts);
	const status = useSelector(getStatus);
	const currentUser = useSelector(getCurrentUser);

	useEffect(() => {
		dispatch(fetchPosts());
	}, []); // eslint-disable-line

	useEffect(() => {
		if (status === "success") {
			dispatch(fetchPosts());
		}
	}, [status]); // eslint-disable-line

	const isFollowing = (id: any) => {
		for (const user of currentUser?.following || []) {
			if (user?.id === id) {
				return true;
			}
		}
		return false;
	};

	return (
		<div className="reversedPosts">
			{posts?.map(
				(post: any) =>
					isFollowing(post?.author?.id) && (
						<PostCard key={post?.id} post={post} />
					)
			)}
		</div>
	);
};

export default Posts;
