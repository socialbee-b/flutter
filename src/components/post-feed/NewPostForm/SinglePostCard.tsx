import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

const SinglePostCard: React.FC<any> = ({ post }) => {
	console.log(post);
	const handleLikeClick = async () => {
		alert("Add like to post");
	};

	const handleCommentClick = async () => {};

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
		</div>
	);
};

export default SinglePostCard;
