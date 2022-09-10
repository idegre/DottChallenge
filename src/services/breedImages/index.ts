import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BreedListResponse, BreedResponse} from './types';

export const rootResponseTransform = (data: BreedResponse) => data.message;

export const listResponseTransform = (data: BreedListResponse): string[] => Object.entries(data.message).flat(2);

export const api = createApi({
	baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BREEDS_API_URL}),
	reducerPath: 'breedImages',
	endpoints: build => ({
		getPhotos: build.query<string[], string>({
			query: (breed) => `/breed/${breed}/images`,
			transformResponse: rootResponseTransform,
		}),
		getList: build.query<string[], void>({
			query: () => '/breeds/list/all',
			transformResponse: listResponseTransform,
		}),
	}),
});

export const {useGetPhotosQuery, useLazyGetPhotosQuery, useGetListQuery, useLazyGetListQuery} = api;
