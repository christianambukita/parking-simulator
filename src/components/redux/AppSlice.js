import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	targetSlot: null,
	parkedAtTarget: false,
	score: 0,
	dummySlots: [],
	showKeyboard: false,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,

	reducers: {
		setTargetSlot: (state, action) => {
			state.targetSlot = action.payload;
		},
		setDummySlots: (state, action) => {
			state.dummySlots = action.payload;
		},
		scoreIncrement: (state) => {
			state.score += 1;
		},
		toggleKeyboard: (state) => {
			state.showKeyboard = !state.showKeyboard;
		},
	},
});

export const { setTargetSlot, scoreIncrement, setDummySlots, toggleKeyboard } =
	appSlice.actions;
export const selectTargetSlot = (state) => state.app.targetSlot;
export const selectScore = (state) => state.app.score;
export const selectDummySlots = (state) => state.app.dummySlots;
export const selectShowKeyboard = (state) => state.app.showKeyboard;

export default appSlice.reducer;
