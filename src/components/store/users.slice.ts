import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://fluttrbeanstalk-env.eba-9z3pzmxs.us-east-1.elasticbeanstalk.com";

// define our initial state
const initialState = {
	status: "idle",
	loginStatus: "idle",
	user: {},
	users: [],
	currentUser: {},
};

export const register = createAsyncThunk("auth/register", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/register`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});
export const login = createAsyncThunk("auth/login", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/login`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});

export const logout = createAsyncThunk("auth/logout", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/logout`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});

export const changeUsername = createAsyncThunk(
	"users/changeUsername",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/username`,
				payload?.username,
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
export const changeEmail = createAsyncThunk(
	"users/changeEmail",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/email`,
				payload?.email,
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

export const changePassword = createAsyncThunk(
	"users/changePassword",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/password`,
				payload?.password,
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

export const fetchAllUsers = createAsyncThunk(
	"users/fetchAllUsers",
	async () => {
		try {
			const response = await axios.get(`${BASE_URL}/users`);
			return response.data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
);

export const getUserById = createAsyncThunk(
	"users/getUserById",
	async (id: any) => {
		try {
			const response = await axios.get(`${BASE_URL}/users/${id}`);
			return response.data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
);

export const changeProfilePic = createAsyncThunk(
	"users/changeProfilePic",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/profileImage`,
				payload.imageUrl,
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

//follow
export const followUser = createAsyncThunk(
	"users/follow",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.otherId}/follow`,
				payload?.id,
				{
					headers: { "Content-type": "application/json" },
				}
			);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);
//unfollow
export const unfollowUser = createAsyncThunk(
	"users/unfollow",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.otherId}/unfollow`,
				payload?.id,
				{
					headers: { "Content-type": "application/json" },
				}
			);
			return response.data;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
);

export const setUser = createAsyncThunk("users/setUser", async (id: any) => {
	try {
		const response = await axios.get(`${BASE_URL}/users/${id}`);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});

// create the user slice
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getUserFromLocal(state) {
			state.user = JSON.parse(localStorage.getItem("user") || "{}");
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
		setLoginStatus(state, action) {
			state.loginStatus = action.payload;
		},
		handleLogout(state) {
			state.user = {};
			localStorage.setItem("user", "{}");
		},
	},
	extraReducers(builder) {
		builder
			.addCase(register.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = "success";
			})
			.addCase(register.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(login.pending, (state, action) => {
				state.loginStatus = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginStatus = "success";
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.loginStatus = "rejected";
			})
			.addCase(changeUsername.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(changeUsername.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(changeUsername.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(fetchAllUsers.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.status = "success";
				state.users = action.payload;
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(getUserById.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				state.status = "success";
				state.currentUser = action.payload;
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(changeProfilePic.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(changeProfilePic.fulfilled, (state, action) => {
				state.status = "success";
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(changeProfilePic.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(changeEmail.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(changeEmail.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(changeEmail.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(changePassword.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(changePassword.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(followUser.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(followUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload[1];
				state.currentUser = action.payload[0];
			})
			.addCase(followUser.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(unfollowUser.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(unfollowUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload[1];
				state.currentUser = action.payload[0];
			})
			.addCase(unfollowUser.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(setUser.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(setUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(setUser.rejected, (state, action) => {
				state.status = "rejected";
			});
	},
});

// export functions you want to use in the app
export const getUser = (state: any) => state.users.user;
export const getStatus = (state: any) => state.users.status;
export const getLoginStatus = (state: any) => state.users.loginStatus;
export const getCurrentUser = (state: any) => state.users.currentUser;
export const getAllUsers = (state: any) => state.users.users;

// export actions
export const { getUserFromLocal, setStatus, handleLogout, setLoginStatus } =
	usersSlice.actions; // eslint-disable-line

// export reducer
export default usersSlice.reducer;
