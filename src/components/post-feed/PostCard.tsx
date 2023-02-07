import "./Posts.css";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, unlikePost } from "../store/posts.slice";
import { addToast } from "../toasts/toasts.slice";
import { getUser } from "../store/users.slice";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { FiEdit, FiTrash } from "react-icons/fi";

const PostCard: React.FC<any> = ({ post }) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const [isLoggedInUser, setIsLoggedInUser] = useState(false);
	const [postLiked, setPostLiked] = useState(false);

	useEffect(() => {
		setIsLoggedInUser(post?.author?.id === user?.id);
	}, []); // eslint-disable-line

	const hasUserLiked = (id: any, likes: any) => {
		for (const like of likes) {
			if (like?.id === id) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		setPostLiked(hasUserLiked(user?.id, post?.likes || []));
	}, [user, post]);

	const handleLikeClick = async () => {
		const payload = {
			postId: post?.id,
			userId: user?.id,
		};
		try {
			dispatch(likePost(payload));
		} catch (err: any) {
			console.log(err);
		}
	};

	const handleUnlikeClick = async () => {
		const payload = {
			postId: post?.id,
			userId: user?.id,
		};
		try {
			dispatch(unlikePost(payload));
		} catch (err: any) {
			console.log(err);
		}
	};

	const handleCommentClick = async () => {
		navigate(`/posts/${post?.id}`);
	};

	const handleDeletePost = async () => {
		try {
			dispatch(deletePost(post?.id));
			dispatch(
				addToast({
					status: "success",
					message: "Your post has been deleted.",
				})
			);
		} catch (err: any) {
			dispatch(
				addToast({
					status: "error",
					message: "Unable to delete post.",
				})
			);
		}
	};

	const handleEditPost = async () => {
		navigate(`/posts/${post?.id}`);
	};

	return (
		<div className="styledPost">
			<div className="postHeader">
				<img src={post?.author?.imageUrl} alt="Headshot" />
				<div className="postUsername">
					<h2>{`${post?.author?.firstName} ${post?.author?.lastName}`}</h2>
					<p>@{post?.author?.username}</p>
				</div>
			</div>
			<div className="postBody">
				<p>{post?.text}</p>
				{post?.imageUrl && <img src={post?.imageUrl} alt="" />}
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
