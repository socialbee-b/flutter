import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users.slice";
import toastsReducer from "../toasts/toasts.slice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		toasts: toastsReducer,
	},
});
