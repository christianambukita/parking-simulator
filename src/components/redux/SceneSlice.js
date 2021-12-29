import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  carPosition: {
      y: 200,
      rotationAngle: 0,
      wheelAngle: 0,
  }
};

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  
  reducers: {
    goForward: (state) => {
      state.carPosition.y -=5;
    },
    goBackward: (state) => {
      state.carPosition.y +=5;
    },
    setAngleLeft: (state) => {
      state.carPosition.wheelAngle -=5;
    },
    setAngleRight: (state) => {
      state.carPosition.wheelAngle +=5;
    },
  },
});

export const { goForward, goBackward, setAngleLeft, setAngleRight} = sceneSlice.actions;
export const selectPosition = (state) => state.scene.carPosition;

export default sceneSlice.reducer;