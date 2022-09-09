import { useCallback } from "react";
import { useGetListQuery, useLazyGetPhotosQuery } from "../services/breedImages";

export const useBreeds = () => {
    const {isLoading: isLoadingList, data: breedsList} = useGetListQuery();
    const [fetchPhotos, {isLoading: isLoadingPhotos, data: photos}] = useLazyGetPhotosQuery();
    const getBreedPhotos = useCallback((userQuery: string) => {
        if (isLoadingList || !breedsList) return
        const words = userQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase().split(' ')
        console.log(words)
        const breed = breedsList.find(b => words.includes(b.toLowerCase()))
        console.log(breed)
        breed && fetchPhotos(breed)
    }, [isLoadingList, breedsList, fetchPhotos])
    return {isLoading: isLoadingList || isLoadingPhotos, photos, getBreedPhotos}
}