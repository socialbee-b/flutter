import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, getUserFromLocal } from "../store/users.slice";
import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts";

export const PostFeed = () => {
	const dispatch = useDispatch<any>();
	const status = useSelector(getStatus);

	useEffect(() => {
		dispatch(getUserFromLocal());
	}, [status]); //eslint-disable-line

	return (
		<div className="flex-column">
			<NewPostForm />
			<Posts />
		</div>
	);
};
export default PostFeed;
