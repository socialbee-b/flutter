import {
	AiFillHeart,
	AiOutlineComment,
	AiOutlineEdit,
	AiOutlineHeart,
} from "react-icons/ai";
import Button from "../../Button/Button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/users.slice";
import {
	createComment,
	createPost,
	deletePost,
	editPostText,
	likePost,
	unlikePost,
} from "../../store/posts.slice";
import { addToast } from "../../toasts/toasts.slice";

const SinglePostCard: React.FC<any> = ({ post }) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<any>();
	const formRef = useRef<HTMLFormElement>(null);
	const [postLiked, setPostLiked] = useState(false);
	const [editText, setEditText] = useState(false);
	const [text, setText] = useState("");

	const hasUserLiked = (id: any, likes: any) => {
		for (const like of likes) {
			if (like?.id === id) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		setPostLiked(hasUserLiked(user?.id, post?.likes));
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

	const commentRef = useRef<HTMLInputElement>(null);
	const [showCommentInput, setShowCommentInput] = useState(false);
	const handleCommentClick = async () => {
		setShowCommentInput(!showCommentInput);
	};

	const handleCreateComment = async (e: any) => {
		e.preventDefault();
		const comment = commentRef.current?.value;

		const payload = {
			postId: post?.id,
			body: {
				text: comment,
				imageUrl: "",
				comments: [],
				author: {
					id: user?.id,
				},
				postType: "Comment",
			},
		};
		try {
			// hit api
			dispatch(createComment(payload));

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

	const handleDeleteComment = async (id: any) => {
		try {
			dispatch(deletePost(id));
			addToast({
				status: "success",
				message: "Your comment has been deleted.",
			});
		} catch (err: any) {
			addToast({
				status: "error",
				message: "Unable to delete comment.",
			});
		}
	};

	const handleEditPost = () => {
		setEditText(!editText);
		setText(post?.text);
	};

	const handleEditPostSubmit = async (e: any) => {
		e.preventDefault();

		if (!text) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter text to edit post.",
				})
			);
		} else {
			const body = {
				id: post?.id,
				text,
			};
			try {
				dispatch(editPostText(body));
				dispatch(
					addToast({
						status: "success",
						message: "Post has been edited.",
					})
				);
				setEditText(false);
			} catch (err) {
				dispatch(
					addToast({
						status: "error",
						message: "Unable to edit post.",
					})
				);
			}
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
				{editText ? (
					<form onSubmit={handleEditPostSubmit}>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
						></textarea>
						<Button>Edit Post</Button>
					</form>
				) : (
					<p>{post?.text}</p>
				)}
				{post?.imageUrl && <img src={post?.imageUrl} alt="" />}
			</div>
			<div className="postFooter">
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
				{user?.id === post?.author?.id && (
					<div className="footerIcon">
						<AiOutlineEdit onClick={handleEditPost} />
						<p>Edit Post</p>
					</div>
				)}
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
				<div className="flex-column gap-0 column-reverse">
					{post?.comments?.map((comment: any) => (
						<div key={comment?.id} className="postComment">
							<div className="commentHeader">
								<img src={comment?.author?.imageUrl} alt="" />
								<h4>{`${comment?.author?.firstName} ${comment?.author?.lastName}`}</h4>
								<p
									onClick={() => handleDeleteComment(comment?.id)}
									className="deleteComment"
								>
									Delete Comment
								</p>
							</div>
							<p>{comment?.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SinglePostCard;
