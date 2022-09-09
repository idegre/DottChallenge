import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {API_URL} from '@env';
import {TaskResponse} from './types';

export const rootResponseTransform = (data: TaskResponse) => {
  console.log(data);
  return data;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'API_URL'}),
  reducerPath: 'breedImages',
  endpoints: build => ({
    getTasks: build.query<TaskResponse, void>({
      query: () => '/',
      transformResponse: rootResponseTransform,
    }),
  }),
});

export const {useGetTasksQuery, useLazyGetTasksQuery} = api;
