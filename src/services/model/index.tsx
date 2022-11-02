import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {ModelObject} from './types';

export const transformLabels = (data: ModelObject) => ({...data, labels: data.labels.map(b => b.split('-').pop() || '')});

export const api = createApi({
	baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_MODEL_JSON_BASE}),
	reducerPath: 'model',
	endpoints: build => ({
		getModel: build.query<ModelObject, void>({
			query: () => process.env.REACT_APP_MODEL_JSON || '',
			transformResponse: transformLabels,
		}),
	}),
});

export const {useGetModelQuery, useLazyGetModelQuery} = api;
