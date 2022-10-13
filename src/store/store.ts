import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postSlice';

export const store = configureStore({
	reducer: {
		postReducer,
	},
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AsyncThunkConfig = {
	state: RootState;
	dispatch: AppDispatch;
};
