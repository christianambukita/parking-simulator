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
