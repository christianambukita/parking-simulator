import { configureStore } from '@reduxjs/toolkit';
import sceneReducer from './SceneSlice';
import appReducer from './AppSlice';

export const store = configureStore({
	reducer: {
		scene: sceneReducer,
		app: appReducer,
	},
});
