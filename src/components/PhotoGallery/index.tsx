import React from 'react';
import { AppError, LoadingErrorContainer } from '../LoadingErrorContainer';
import { GalleryImage } from './components/GalleryImage';
import { Container } from './styled';

import locales from '../../locales/en';

type Props = {
    isLoading?: boolean
    urls?: string[]
    getAlt: (index: number) => string
    getKey: (url: string) => string
	error?: AppError | null
}

export const Constants = {
	NO_ITEM_CARD_ID: 'NO_ITEM_CARD_ID',
	PHOTO_CONTAINER: 'PHOTO_CONTAINER',
	IMG_DIMENTIONS: 200
};

export const PhotoGallery = ({isLoading, urls = [], getAlt, getKey, error}: Props) => {
	return <LoadingErrorContainer isLoading={isLoading} error={error}>
		<Container data-testid={Constants.PHOTO_CONTAINER}>
			{urls.length 
				? urls && urls.map(
					(url, index) => (
						<GalleryImage 
							key={getKey(url)}
							dimentions={Constants.IMG_DIMENTIONS}
							alt={getAlt(index)}
							src={url}
						/>
					))
				: (
					<div data-testid={Constants.NO_ITEM_CARD_ID}>{locales.noItems}</div>
				)
			}
		</Container> 
	</LoadingErrorContainer>;
};