import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {api as breedApi} from '../services/breedImages';
import {api as modelApi} from '../services/model';
import ImageReducer, {reducerPath as userImagePath} from './slices/userImage';

export const store = configureStore({
	reducer: combineReducers({
		[userImagePath]: ImageReducer,
		[breedApi.reducerPath]: breedApi.reducer,
		[modelApi.reducerPath]: modelApi.reducer,
	}),
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}).concat([breedApi.middleware, modelApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
