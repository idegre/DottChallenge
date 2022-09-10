import React, { ChangeEvent, SyntheticEvent, useCallback } from 'react';
import { ImageSelector } from '../components/ImageSelector';
import { PhotoGallery } from '../components/PhotoGallery';
import { useBreeds } from '../hooks/use-breeds';
import { useMobilenet } from '../hooks/use-mobilenet';
import { useAppDispatch } from '../store/hooks';
import { selectImage, setImageContent } from '../store/slices/userImage';

export const HomeScreen = () => {
	const dispatch = useAppDispatch();

	const {isLoading, predictImageContent, error: modelError} = useMobilenet();
	const {getBreedPhotos, isLoading: isLoadingBreeds, photos, error: photosError} = useBreeds();

	const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(selectImage(e)), [dispatch]);

	const handleLoad = useCallback(async (imgEvt: SyntheticEvent<HTMLImageElement, Event>) => {
		const classes = await predictImageContent(imgEvt.currentTarget);
		classes && dispatch(setImageContent(classes));
		classes?.length && getBreedPhotos(classes[0].className);
	}, [predictImageContent, dispatch, getBreedPhotos]);

	const getAlt = useCallback(() => 'dogs',[]);

	const getKey = (url:string) => `${url.split('/').pop()}`;
  
	return (
		<>
			<ImageSelector onInputChange={onInputChange} error={modelError} onLoad={handleLoad} isLoading={isLoading}/>
			<PhotoGallery isLoading={isLoadingBreeds} urls={photos} getAlt={getAlt} error={photosError} getKey={getKey}/>
		</>
	);
};


