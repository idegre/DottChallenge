import { MobileNet } from '@tensorflow-models/mobilenet';
import {act, renderHook, RenderHookResult} from '@testing-library/react-hooks';
import { useMobilenet } from '../use-mobilenet';

jest.mock('@tensorflow-models/mobilenet', () => ({
	load: jest.fn(() => new Promise<MobileNet>(
		(res, _) => res({
			classify: (img: HTMLImageElement) => new Promise<{
                className: string;
                probability: number;
            }[] | undefined>((res) => res([{className: 'mock_class', probability: 1}]))
		} as unknown as MobileNet)
	))
}));

jest.mock('@tensorflow/tfjs', () => ({
	ready: jest.fn(() => new Promise<void>(
		(res, _) => res()
	))
}));

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

type HookRes = RenderHookResult<void, ReturnType<typeof useMobilenet>>

describe('mobilenet hook', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('mobilenet loads on mount and sets loading', async () => {

		const mobilenetSpy = jest.spyOn(mobilenet, 'load');
		const tfSpy = jest.spyOn(tf, 'ready');

		let renderedHook: HookRes = {} as HookRes;
        
		await act(async () => {
			renderedHook = renderHook(() => useMobilenet());
		});

		expect(mobilenetSpy).toBeCalledTimes(1);
		expect(tfSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);
	});
	test('model fails to load', async () => {
            
		const mobilenetSpy = jest.spyOn(mobilenet, 'load');
		const tfSpy = jest.spyOn(tf, 'ready');

		mobilenetSpy.mockImplementationOnce(() => new Promise<MobileNet>((_, rej) => rej()));
            
		let renderedHook: HookRes = {} as HookRes;
		await act(async () => {
			renderedHook = renderHook(() => useMobilenet());
		});
		expect(mobilenetSpy).toBeCalledTimes(1);
		expect(tfSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toStrictEqual({'msg': 'Failed to load model', 'type': 'model_error'});
	});
	test('tensorflow fails to start',async () => {

		const mobilenetSpy = jest.spyOn(mobilenet, 'load');
		const tfSpy = jest.spyOn(tf, 'ready');

		tfSpy.mockImplementationOnce(() => new Promise<void>((_, rej) => rej()));
          
		let renderedHook: HookRes = {} as HookRes;

		await act(async () => {
			renderedHook = renderHook(() => useMobilenet());
		});

		expect(mobilenetSpy).toBeCalledTimes(0);
		expect(tfSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toStrictEqual({'msg': 'Failed to initialize tensorflow', 'type': 'tf_error'});
	});
	test('predicts and returs data', async () => {
		const mobilenetSpy = jest.spyOn(mobilenet, 'load');
		const tfSpy = jest.spyOn(tf, 'ready');

          
		let renderedHook: HookRes = {} as HookRes;

		await act(async () => {
			renderedHook = renderHook(() => useMobilenet());
		});

		expect(mobilenetSpy).toBeCalledTimes(1);
		expect(tfSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);

		await act(async () => {
			const data = await renderedHook.result.current.predictImageContent({} as HTMLImageElement);
			expect(data?.length).toBe(1);
			expect(data?.[0].className).toBe('mock_class');
			expect(renderedHook?.result?.current.error).toBe(null);
		});
	});
	test('fails to predict and returns error', async () => {
		const mobilenetSpy = jest.spyOn(mobilenet, 'load');
		const tfSpy = jest.spyOn(tf, 'ready');

		mobilenetSpy.mockImplementationOnce(jest.fn(() => new Promise<MobileNet>(
			(res, _) => res({
				classify: (img: HTMLImageElement) => new Promise<{
                        className: string;
                        probability: number;
                    }[] | undefined>((_,rej) => rej())
			} as unknown as MobileNet)
		)));
          
		let renderedHook: HookRes = {} as HookRes;

		await act(async () => {
			renderedHook = renderHook(() => useMobilenet());
		});

		expect(mobilenetSpy).toBeCalledTimes(1);
		expect(tfSpy).toBeCalledTimes(1);
		expect(renderedHook?.result?.current.isLoading).toBe(false);
		expect(renderedHook?.result?.current.error).toBe(null);

		await act(async () => {
			const data = await renderedHook.result.current.predictImageContent({} as HTMLImageElement);
			expect(data).toBe(undefined);
			expect(renderedHook?.result?.current.error).toStrictEqual({'msg': 'Failed to classify image', 'type': 'classification_error'});
		});
	});
});