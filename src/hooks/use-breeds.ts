import { useCallback, useEffect, useState } from 'react';
import { AppError } from '../components/LoadingErrorContainer';
import { useGetListQuery, useLazyGetPhotosQuery } from '../services/breedImages';

export const errors = {
	breedNotFound: {
		type: 'breed_not_found',
		msg: 'We couldn\'t recognize your dog'
	},
	fetchError: {
		type: 'fetch_error',
		msg: 'We couldnt get the data'
	}
};

export const useBreeds = () => {
	const {isLoading: isLoadingList, data: breedsList, error: listError} = useGetListQuery();
	const [fetchPhotos, {isLoading: isLoadingPhotos, data: photos, error: photosError}] = useLazyGetPhotosQuery();
	const [error, setError] = useState<AppError | null>(null);

	useEffect(() => {
		setError((listError || photosError) ? errors.fetchError : null);
	}, [listError, photosError]);

	const getBreedPhotos = useCallback((userQuery: string) => {
		if (isLoadingList || !breedsList || error) return;
		const words = userQuery.toLowerCase().replaceAll('_','-').split('-');
		const breed = breedsList.find(b => words.includes(b.toLowerCase()) || b === words.join(''));
		if(!breed) {
			setError(errors.breedNotFound);
			return;
		}
		try{
			return breed && fetchPhotos(breed);
		} catch {
			setError(errors.fetchError);
		}
	}, [isLoadingList, breedsList, fetchPhotos]);
    
	return {isLoading: isLoadingList || isLoadingPhotos, photos, getBreedPhotos, error};
};