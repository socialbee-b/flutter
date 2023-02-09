import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "../store/posts.slice";
import { getUser } from "../store/users.slice";
import PostCard from "./PostCard";

const Posts: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);
	const posts = useSelector(getPosts);
	const [filteredPost, setFilteredPosts] = useState(<></>);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [user]); // eslint-disable-line

	const isFollowing = (id: any) => {
		for (const following of user?.following || []) {
			if (following?.id === id) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		setFilteredPosts(
			<>
				{posts.map(
					(post: any) =>
						isFollowing(post?.author?.id) && (
							<PostCard
								key={post?.id}
								post={post}
								isLoggedInUser={user?.id === post?.author?.id}
							/>
						)
				)}
			</>
		);
	}, [user, posts]); // eslint-disable-line

	return (
		<div className="reversedPosts">
			{posts?.length === 0 ? <h2>Loading...</h2> : filteredPost}
		</div>
	);
};

export default Posts;
