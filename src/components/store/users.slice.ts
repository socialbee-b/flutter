import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// define our initial state
const initialState = {
	status: "idle",
	user: {},
	users: [],
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

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
	try {
		const response = await axios.get(`${BASE_URL}/users`);
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
});

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
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = "success";
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(changeUsername.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(changeUsername.fulfilled, (state, action) => {
				state.status = "success";
			})
			.addCase(changeUsername.rejected, (state, action) => {
				state.status = "rejected";
			})
			.addCase(getAllUsers.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.status = "success";
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
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
			});
	},
});

// export functions you want to use in the app
export const getUser = (state: any) => state.users.user;
// () => JSON.parse(localStorage.getItem("user") || "{}");
export const getStatus = (state: any) => state.users.status;

// export actions
export const { getUserFromLocal, setStatus, handleLogout } = usersSlice.actions; // eslint-disable-line

// export reducer
export default usersSlice.reducer;
