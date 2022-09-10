import React, { useCallback, useState } from 'react';
import { AppError, LoadingErrorContainer } from '../../../LoadingErrorContainer';
import {Image} from './styled';

type Props = {
    dimentions: number,
    alt: string,
    src: string
}

const LOAD_ERROR = {
	type: 'IMG_LOAD_ERROR',
	msg: 'Couldn\'t load image' 
};

export const GalleryImage = ({dimentions, alt, src}: Props) => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<AppError | null>(null);

	const handleLoad = useCallback(() => {
		setLoading(false);
	},[]);

	const handleError = useCallback(() => {
		setError(LOAD_ERROR);
		setLoading(false);
	},[]);

	return <LoadingErrorContainer isLoading={isLoading} error={error}>
		<Image 
			height={dimentions} 
			width={dimentions} 
			onLoad={handleLoad}
			onError={handleError}
			alt={alt} 
			src={src} 
			loading="lazy"
		/>
	</LoadingErrorContainer>;
};