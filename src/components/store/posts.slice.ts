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
				author: body?.author?.id,
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
	async (body: any) => {
		try {
			const response = await axios.delete(`${BASE_URL}/posts/${body?.id}`);
			return response.data;
		} catch (err: any) {
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

//edit post by image

//add a like

//delete a like

// create the slice
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
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
			});
	},
});

export const getPosts = (state: any) => state.posts.posts;
export const getCurrentPost = (state: any) => state.posts.currentPost;
export const getStatus = (state: any) => state.posts.status;

export default postsSlice.reducer;
