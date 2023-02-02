import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState: any = {
	toasts: [],
};

// create toast slice
const toastsSlice = createSlice({
	name: "toasts",
	initialState,
	reducers: {
		addToast(state, action) {
			state.toasts.push({ id: nanoid(), ...action.payload });
		},
		removeToast(state, action) {
			const newToasts = [];
			for (const toast of state.toasts) {
				if (toast?.id !== action.payload) {
					newToasts.push(toast);
				}
			}
			state.toasts = newToasts;
		},
	},
});

// export functions
export const getToasts = (state: any) => state.toasts.toasts;

// export actions
export const { addToast, removeToast } = toastsSlice.actions;

// export reducer
export default toastsSlice.reducer;
