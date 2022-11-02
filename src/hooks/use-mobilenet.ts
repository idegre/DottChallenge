import * as tf from '@tensorflow/tfjs';
import { GraphModel, io, Tensor } from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppError } from '../components/LoadingErrorContainer';
import locales from '../locales/en';
import { useGetModelQuery } from '../services/model';

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

export type LabeledPredictions = {
	probability: number,
	label: string,
	index: number
}[]

export const getLabeledPredictions = (pred: tf.Tensor<tf.Rank>, labels: string[]) => (pred.arraySync()as number[][])[0].map((prob, i) => ({
	probability: prob,
	index: i,
	label: labels[i]
}));

export const getPredictions = (pred: tf.Tensor<tf.Rank>, labels: string[]):LabeledPredictions => getLabeledPredictions(pred, labels)
	.filter(({probability}) => probability > 0.3)
	.sort(({probability: p1}, {probability: p2}) => p1 > p2 ? -1 : 1);

export const useMobilenet = () => {
	const modelRef = useRef<GraphModel<string | io.IOHandler> | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<AppError | null>(null);
	const {isLoading: isLoadingModelJSON, data: modelJSON, error: JSONError} = useGetModelQuery();

	useEffect(() => {
		if(modelRef?.current) return;
		setIsLoading(true);
		const loadTF = async () => {
			try {
				try{
					await tf.ready();
				} catch {
					setError(errors.tfError);
				}
				const model = await tf.loadGraphModel(`${modelJSON?.modelLocation}`);
				modelRef.current = model;
			} catch(e) {
				setError(errors.modelError);
			}
			setIsLoading(false);
		};
		if(modelJSON) loadTF();
	},[isLoadingModelJSON]);

	const predictImageContent = useCallback(async (img: HTMLImageElement) => {
		setIsLoading(true);
		try{
			const data = await modelRef.current?.predict(
				tf.browser.fromPixels(img)
					.resizeBilinear([160,160])
					.reshape([-1, 160,160,3])
			) as Tensor;
			setIsLoading(false);
			console.log(typeof data, data.arraySync());
			if(modelJSON?.labels){
				console.log(getPredictions(data, modelJSON?.labels));
				return getPredictions(data, modelJSON?.labels);
			}
		} catch(e) {
			console.log(e);
			setError(errors.classError);
			setIsLoading(false);
		}
	},[setIsLoading, modelJSON]);

	return {isLoading, predictImageContent, error};
};
