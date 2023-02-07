import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// define our initial state
const initialState = {
	posts: [],
	comments: [],
	currentPost: {},
	status: "idle", // idle | loading | success | rejected
};

// async thunks
//create post
export const createPost = createAsyncThunk(
	"posts/createPosts",
	async (body: any) => {
		try {
			const response = await axios.post(`${BASE_URL}/posts`, {
				text: body?.text,
				imageUrl: body?.imageUrl,
				comments: body?.comments,
				author: body?.author,
				postType: body?.postType,
			});
			return response.data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
);

//delete post
export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (id: any) => {
		try {
			const response = await axios.delete(`${BASE_URL}/posts/${id}`);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await axios.get(`${BASE_URL}/posts/feed`);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});

//get post by post id
export const fetchPostById = createAsyncThunk(
	"posts/fetchPostById",
	async (id: any) => {
		try {
			const response = await axios.get(`${BASE_URL}/posts/${id}`);
			return response.data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
);

//get posts by user id

//edit post text
export const editPostText = createAsyncThunk(
	"posts/editPostText",
	async (body: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/posts/editPost/${body?.id}`,
				body?.text,
				{
					headers: { "Content-type": "text/plain" },
				}
			);
			return response.data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
);

//edit post by image

//add a like
export const likePost = createAsyncThunk(
	"posts/likePost",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/posts/${payload.postId}/like/${payload.userId}`
			);
			console.log(response.data);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

//unlike
export const unlikePost = createAsyncThunk(
	"posts/unlikePost",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/posts/${payload.postId}/unlike/${payload.userId}`
			);
			console.log(response.data);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

//create comment
export const createComment = createAsyncThunk(
	"posts/createComments",
	async (payload: any) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/posts/${payload?.postId}/comment`,
				payload?.body
			);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

//delete comment
export const deleteComment = createAsyncThunk(
	"posts/deleteComments",
	async (payload: any) => {
		try {
			const response = await axios.delete(
				`${BASE_URL}/posts/${payload?.postId}/comments/${payload?.commentId}`
			);
			console.log(response.data);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

// create the slice
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "success";
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(fetchPostById.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPostById.fulfilled, (state, action) => {
				state.status = "success";
				state.currentPost = action.payload;
			})
			.addCase(fetchPostById.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(likePost.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.status = "success";
				state.currentPost = action.payload;
			})
			.addCase(likePost.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(unlikePost.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(unlikePost.fulfilled, (state, action) => {
				state.status = "success";
				state.currentPost = action.payload;
			})
			.addCase(unlikePost.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(deletePost.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = "success";
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(editPostText.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(editPostText.fulfilled, (state, action) => {
				state.status = "success";
			})
			.addCase(editPostText.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(createComment.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.status = "success";
				state.currentPost = action.payload;
			})
			.addCase(createComment.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(deleteComment.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.status = "success";
				state.currentPost = action.payload;
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.status = "rejected";
			});
	},
});

export const { setStatus } = postsSlice.actions;

export const getPosts = (state: any) => state.posts.posts;
export const getCurrentPost = (state: any) => state.posts.currentPost;
export const getStatus = (state: any) => state.posts.status;

export default postsSlice.reducer;
