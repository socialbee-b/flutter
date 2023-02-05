import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import Button from "../../Button/Button";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/users.slice";
import { createPost, likePost } from "../../store/posts.slice";
import { addToast } from "../../toasts/toasts.slice";

const SinglePostCard: React.FC<any> = ({ post }) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const formRef = useRef<HTMLFormElement>(null);

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

	const commentRef = useRef<HTMLInputElement>(null);
	const [showCommentInput, setShowCommentInput] = useState(false);
	const handleCommentClick = async () => {
		setShowCommentInput(!showCommentInput);
	};

	const handleCreateComment = async (e: any) => {
		e.preventDefault();
		const comment = commentRef.current?.value;

		const body = {
			author: { id: user?.id },
			text: comment,
			imageUrl: "",
			comments: [],
			postType: "Comment",
		};

		try {
			// hit api
			dispatch(createPost(body));

			// clear form
			if (formRef.current !== null) {
				formRef.current.reset();
			}

			// send message to user
			dispatch(
				addToast({
					status: "success",
					message: "Your comment has been added to this post.",
				})
			);
		} catch (err: any) {
			// on failure notify user
			dispatch(
				addToast({
					status: "error",
					message: "Unable to create a comment.",
				})
			);
		}
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
					<p>{post?.comments?.length || 0} Comments</p>
				</div>
			</div>
			{showCommentInput && (
				<div className="createComment">
					<form
						ref={formRef}
						className="flex-row"
						onSubmit={handleCreateComment}
					>
						<input ref={commentRef} type="text" placeholder="Write message" />
						<Button>Add Comment</Button>
					</form>
				</div>
			)}
			<div className="postComments">
				<h3>Comments</h3>
				{post?.comments?.map((comment: any) => (
					<div key={comment?.id} className="postComment">
						<div className="commentHeader">
							<img src={comment?.author?.imageUrl} />
							<h4>{`${comment?.author?.firstName} ${comment?.author?.lastName}`}</h4>
						</div>
						<p>{comment?.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SinglePostCard;
