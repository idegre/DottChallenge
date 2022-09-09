import { useCallback } from 'react';
import { useGetListQuery, useLazyGetPhotosQuery } from '../services/breedImages';

export const useBreeds = () => {
	const {isLoading: isLoadingList, data: breedsList} = useGetListQuery();
	const [fetchPhotos, {isLoading: isLoadingPhotos, data: photos}] = useLazyGetPhotosQuery();

	const getBreedPhotos = useCallback((userQuery: string) => {
		if (isLoadingList || !breedsList) return;
		// eslint-disable-next-line no-useless-escape
		const words = userQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').toLowerCase().split(' ');
		const breed = breedsList.find(b => words.includes(b.toLowerCase()));
		breed && fetchPhotos(breed);
	}, [isLoadingList, breedsList, fetchPhotos]);
    
	return {isLoading: isLoadingList || isLoadingPhotos, photos, getBreedPhotos};
};