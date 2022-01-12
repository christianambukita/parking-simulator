import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	targetSlot: null,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,

	reducers: {
		setTargetSlot: (state, action) => {
			state.targetSlot = action.payload;
		},
	},
});

export const { setTargetSlot } = appSlice.actions;
export const selectTargetSlot = (state) => state.app.targetSlot;

export default appSlice.reducer;
