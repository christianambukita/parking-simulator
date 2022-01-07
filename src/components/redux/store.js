import { configureStore } from '@reduxjs/toolkit';
import sceneReducer from './SceneSlice';

export const store = configureStore({
	reducer: {
		scene: sceneReducer,
	},
});
