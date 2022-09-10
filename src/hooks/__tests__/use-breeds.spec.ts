
import {act, renderHook, RenderHookResult} from '@testing-library/react-hooks';
import { useBreeds } from '../use-breeds';

jest.mock('../../services/breedImages', () => ({
	useLazyGetPhotosQuery: jest.fn(() => ([jest.fn(), {isLoading: false, data: ['breed1'], error: undefined}])),
	useGetListQuery: jest.fn(() => ({isLoading: false, data: ['breed1'], error: undefined})),
}));

import * as queries from '../../services/breedImages';

type HookRes = RenderHookResult<void, ReturnType<typeof useBreeds>>

describe('use-breeds hook', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('hooks loads list on mount and sets loading', async () => {

		const listSpy = jest.spyOn(queries, 'useGetListQuery');

		let renderedHook: HookRes = {} as HookRes;
        
		await act(async () => {
			renderedHook = renderHook(() => useBreeds());
		});

		expect(listSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);
	});
	test('hooks loads list on mount and fails and sets error', async () => {

		const listSpy = jest.spyOn(queries, 'useGetListQuery');

		listSpy.mockImplementation(() => ({
			isLoading: false,
			data: undefined,
			error: 'failed-fetch',
		} as unknown as ReturnType<typeof queries.useGetListQuery>));

		let renderedHook: HookRes = {} as HookRes;
        
		await act(async () => {
			renderedHook = renderHook(() => useBreeds());
		});

		expect(listSpy).toBeCalled();
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toStrictEqual(
			{'msg': 'We couldnt get the data', 'type': 'fetch_error'}
		);
	});
	test('hook can find breed match and load images', async () => {

		jest.resetAllMocks();

		const listSpy = jest.spyOn(queries, 'useGetListQuery');
		const photosSpy = jest.spyOn(queries, 'useLazyGetPhotosQuery');

		const mockFetch = jest.fn();

		listSpy.mockImplementation(() => ({
			isLoading: false,
			data: ['breed1'],
			error: undefined
		} as unknown as ReturnType<typeof queries.useGetListQuery>));

		photosSpy.mockImplementation(() => ([
			mockFetch, 
			{
				isLoading: false, 
				data: ['url1'], 
				error: undefined
			}
		] as unknown as ReturnType<typeof queries.useLazyGetPhotosQuery>));

		let renderedHook: HookRes = {} as HookRes;
        
		await act(async () => {
			renderedHook = renderHook(() => useBreeds());
		});

		// expect(listSpy).toBeCalled();
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);

		await act(async () => {
			renderedHook.result.current.getBreedPhotos('breed1');
		});
		expect(mockFetch).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);
		expect(renderedHook?.result?.current.photos).toStrictEqual(['url1']);
	});
	test('hook cant find breed match', async () => {

		jest.resetAllMocks();

		const listSpy = jest.spyOn(queries, 'useGetListQuery');
		const photosSpy = jest.spyOn(queries, 'useLazyGetPhotosQuery');

		const mockFetch = jest.fn();

		listSpy.mockImplementation(() => ({
			isLoading: false,
			data: ['breed1'],
			error: undefined
		} as unknown as ReturnType<typeof queries.useGetListQuery>));

		photosSpy.mockImplementation(() => ([
			mockFetch, 
			{
				isLoading: false, 
				data: undefined, 
				error: undefined
			}
		] as unknown as ReturnType<typeof queries.useLazyGetPhotosQuery>));

		let renderedHook: HookRes = {} as HookRes;
        
		await act(async () => {
			renderedHook = renderHook(() => useBreeds());
		});

		// expect(listSpy).toBeCalled();
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);

		await act(async () => {
			renderedHook.result.current.getBreedPhotos('breed2');
		});
		expect(mockFetch).toBeCalledTimes(0);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toStrictEqual({
			type: 'breed_not_found',
			msg: 'We couldn\'t recognize your dog'
		});
		expect(renderedHook?.result?.current.photos).toBe(undefined);
	});
});