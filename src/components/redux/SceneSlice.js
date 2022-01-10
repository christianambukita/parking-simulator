import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	carPosition: {},
	slotsPositions: {},
	carParked: undefined,
};

export const sceneSlice = createSlice({
	name: 'scene',
	initialState,

	reducers: {
		setCarPosition: (state, payload) => {
			state.carPosition = payload;
		},
		setSlotsPositions: (state, payload) => {
			state.slotsPositions = payload;
		},
		setParked: (state, payload) => {
			state.carParked = payload;
		},
	},
});

export const { setCarPosition, setSlotsPositions, setParked } =
	sceneSlice.actions;
export const selectSlots = (state) => state.scene.slotsPositions;
export const selectCar = (state) => state.scene.carPosition;
export const selectParked = (state) => state.scene.carParked;

export default sceneSlice.reducer;
