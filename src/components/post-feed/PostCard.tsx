import "./Posts.css";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { likePost } from "../store/posts.slice";
import { addToast } from "../toasts/toasts.slice";

const PostCard: React.FC<any> = ({ post }) => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const handleLikeClick = async () => {
		try {
			dispatch(likePost(post?.id));
			dispatch(
				addToast({
					status: "success",
					message: "Liked post.",
				})
			);
		} catch (err: any) {
			dispatch(
				addToast({
					status: "error",
					message: "Unable to like post.",
				})
			);
		}
	};

	const handleCommentClick = async () => {
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
				{post?.imageUrl && <img src={post?.imageUrl} />}
			</div>
			<div className="postFooter">
				<div className="footerIcon">
					<AiOutlineHeart onClick={handleLikeClick} />
					<p>{post?.likes} Likes</p>
				</div>
				<div className="footerIcon">
					<AiOutlineComment onClick={handleCommentClick} />
					<p>{post?.comments.length || 0} Comments</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
