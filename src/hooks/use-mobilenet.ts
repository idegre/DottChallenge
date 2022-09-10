import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppError } from '../components/LoadingErrorContainer';
import locales from '../locales/en';

export const errors = {
	modelError: {
		type: 'model_error',
		msg: locales.modelError
	},
	tfError: {
		type: 'tf_error',
		msg: locales.tfError
	},
	classError: {
		type: 'classification_error',
		msg: locales.classifyError
	},
};

export const useMobilenet = () => {
	const modelRef = useRef<mobilenet.MobileNet | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<AppError | null>(null);

	useEffect(() => {
		setIsLoading(true);
		tf.ready()
			.then(() => {
				mobilenet.load()
					.then((model) => {
						modelRef.current = model;
					})
					.catch(() => {
						setError(errors.modelError);
					})
					.finally(() => setIsLoading(false));
			})
			.catch(() => {
				setError(errors.tfError);
				setIsLoading(false);
			});
	},[]);

	const predictImageContent = useCallback(async (img: HTMLImageElement) => {
		setIsLoading(true);
		try{
			const data = await modelRef.current?.classify(img);
			setIsLoading(false);
			return data;
		} catch {
			setError(errors.classError);
			setIsLoading(false);
		}
	},[setIsLoading]);

	return {isLoading, predictImageContent, error};
};
