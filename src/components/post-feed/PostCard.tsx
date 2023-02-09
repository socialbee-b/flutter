import "./Posts.css";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePost,
	fetchPosts,
	likePost,
	unlikePost,
} from "../store/posts.slice";
import { addToast } from "../toasts/toasts.slice";
import { getUser } from "../store/users.slice";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { FiEdit, FiTrash } from "react-icons/fi";
import "./PostCard.css";

const PostCard: React.FC<any> = ({ post, isLoggedInUser }) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const [postLiked, setPostLiked] = useState(false);

	const hasUserLiked = () => {
		if (user?.id && post?.likes?.length > 0) {
			for (const like of post?.likes) {
				if (like?.id === user?.id) {
					return true;
				}
			}
		}
		return false;
	};

	useEffect(() => {
		setPostLiked(hasUserLiked());
	}, [user, post]); // eslint-disable-line

	const handleLikeClick = async () => {
		const payload = {
			postId: post?.id,
			userId: user?.id,
		};
		dispatch(likePost(payload));
		dispatch(fetchPosts());
		dispatch(
			addToast({
				status: "success",
				message: `Liked ${post?.author?.firstName}'s post.`,
			})
		);
	};

	const handleUnlikeClick = async () => {
		const payload = {
			postId: post?.id,
			userId: user?.id,
		};
		dispatch(unlikePost(payload));
		dispatch(fetchPosts());
		dispatch(
			addToast({
				status: "success",
				message: `Unliked ${post?.author?.firstName}'s post.`,
			})
		);
	};

	const handleCommentClick = async () => {
		navigate(`/posts/${post?.id}`);
	};

	const handleDeletePost = async () => {
		dispatch(deletePost(post?.id));
		dispatch(
			addToast({
				status: "success",
				message: "Your post has been deleted.",
			})
		);
	};

	const handleEditPost = async () => {
		navigate(`/posts/${post?.id}`);
	};

	return (
		<div className="styledPost">
			<div className="postHeader">
				<img src={post?.author?.imageUrl} alt="Headshot" />
				<div
					className="postUsername"
					onClick={() => navigate(`/users/${post?.author?.id}`)}
				>
					<h2>{`${post?.author?.firstName} ${post?.author?.lastName}`}</h2>
					<p>@{post?.author?.username}</p>
				</div>
			</div>
			<div className="postBody">
				<p>{post?.text}</p>
				{post?.imageUrl && (
					<img className="pictures" src={post?.imageUrl} alt="" />
				)}
			</div>
			<div className="postFooter space-between">
				<div className="flex-row">
					<div className="footerIcon">
						{postLiked ? (
							<AiFillHeart className="liked" onClick={handleUnlikeClick} />
						) : (
							<AiOutlineHeart onClick={handleLikeClick} />
						)}
						<p>{post?.likes?.length || 0} Likes</p>
					</div>
					<div className="footerIcon">
						<AiOutlineComment onClick={handleCommentClick} />
						<p>{post?.comments?.length || 0} Comments</p>
					</div>
				</div>
				<div className="flex-row">
					{isLoggedInUser && (
						<>
							<Button onClick={handleDeletePost}>
								Delete <FiTrash />
							</Button>
							<Button onClick={handleEditPost}>
								Edit <FiEdit />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostCard;
