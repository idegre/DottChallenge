import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {api as breedApi} from '../services/breedImages';
import ImageReducer, {reducerPath as userImagePath} from './slices/userImage';

export const store = configureStore({
  reducer: combineReducers({
    [userImagePath]: ImageReducer,
    [breedApi.reducerPath]: breedApi.reducer,
  }),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(breedApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
