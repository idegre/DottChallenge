import React from 'react';
import {Provider} from 'react-redux';
import { HomeScreen } from './HomeScreen';
import { store } from './store/store';

export const App = () => (
	<Provider store={store}>
		<HomeScreen />
	</Provider>
);
