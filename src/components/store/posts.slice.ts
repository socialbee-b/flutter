import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// define our initial state
const initialState = {
	posts: [],
	comments: [],
	replies: [],
	currentPost: {},
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
			return err.message;
		}
	}
);

//get post by post id
//get posts by user id

// create the slice
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers(builder) {},
});

export default postsSlice.reducer;
