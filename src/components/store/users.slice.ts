import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// define our initial state
const initialState = {
	status: "idle",
	users: [],
};

export const register = createAsyncThunk("auth/register", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/register`, body);
		return response.data;
	} catch (err: any) {
		return err.message;
	}
});
export const login = createAsyncThunk("auth/login", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/login`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err.message);
	}
});

export const logout = createAsyncThunk("auth/logout", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/logout`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err.message);
	}
});

export const changeUsername = createAsyncThunk(
	"users/changeUsername",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/username`,
				{ password: payload?.newPassword }
			);
			return response.data;
		} catch (err: any) {
			return new Error(err.message);
		}
	}
);
export const changeEmail = createAsyncThunk(
	"users/changeEmail",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/email`,
				{ password: payload?.newPassword }
			);
			return response.data;
		} catch (err: any) {
			return new Error(err.message);
		}
	}
);

export const changePassword = createAsyncThunk(
	"users/changePassword",
	async (payload: any) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/users/${payload?.id}/password`,
				{ password: payload?.newPassword }
			);
			return response.data;
		} catch (err: any) {
			return new Error(err.message);
		}
	}
);

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
	try {
		const response = await axios.get(`${BASE_URL}/users`);
		return response.data;
	} catch (err: any) {
		return err.message;
	}
});

// create the user slice
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setStatus(state, action) {
			state.status = action.payload;
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
			});
	},
});

// export functions you want to use in the app
export const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");
export const getStatus = (state: any) => state.users.status;

// export actions
export const { setStatus } = usersSlice.actions; // eslint-disable-line

// export reducer
export default usersSlice.reducer;
