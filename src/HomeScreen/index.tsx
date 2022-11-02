import React, { ChangeEvent, SyntheticEvent, useCallback } from 'react';

import { ImageSelector } from '../components/ImageSelector';
import { PhotoGallery } from '../components/PhotoGallery';

import { useBreeds } from '../hooks/use-breeds';
import { useMobilenet } from '../hooks/use-mobilenet';

import { useAppDispatch } from '../store/hooks';

import { Container } from './styled';

import locales from '../locales/en';

export const HomeScreen = () => {
	const dispatch = useAppDispatch();

	const {isLoading, predictImageContent, error: modelError} = useMobilenet();
	const {getBreedPhotos, isLoading: isLoadingBreeds, photos, error: photosError} = useBreeds();

	const onChange = useCallback(async (img: React.MutableRefObject<HTMLImageElement>) => {
		const classes = await predictImageContent(img.current);
		classes?.length && getBreedPhotos(classes[0].label);
	}, [predictImageContent, dispatch, getBreedPhotos]);

	const getAlt = useCallback(() => locales.alt,[]);

	const getKey = (url:string) => `${url.split('/').pop()}`;
  
	return (
		<Container>
			<ImageSelector onChange={onChange} error={modelError} isLoading={isLoading}/>
			<PhotoGallery isLoading={isLoadingBreeds} urls={photos} getAlt={getAlt} error={photosError} getKey={getKey}/>
		</Container>
	);
};


