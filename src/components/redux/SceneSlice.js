import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	carPosition: {},
	slotsPositions: {},
	carParked: {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false,
		9: false,
	},
	keyboard: {},
};

export const sceneSlice = createSlice({
	name: 'scene',
	initialState,

	reducers: {
		setCarPosition: (state, action) => {
			state.carPosition = action.payload;
		},
		setSlotsPositions: (state, action) => {
			state.slotsPositions = action.payload;
		},
		setParked: (state, action) => {
			state.carParked = action.payload;
		},
		setKey: (state, action) => {
			const { key, press } = action.payload;
			state.keyboard[key] = press;
		},
	},
});

export const { setCarPosition, setSlotsPositions, setParked, setKey } =
	sceneSlice.actions;
export const selectSlots = (state) => state.scene.slotsPositions;
export const selectCar = (state) => state.scene.carPosition;
export const selectParked = (state) => state.scene.carParked;
export const selectKeyboard = (state) => state.scene.keyboard;

export default sceneSlice.reducer;
