import React from 'react';
import { AppError, LoadingErrorContainer } from '../LoadingErrorContainer';
import { Container, Image } from './styled';

type Props = {
    isLoading?: boolean
    urls?: string[]
    getAlt: (index: number) => string
    getKey: (url: string) => string
	error?: AppError | null
}

export const Constants = {
	NO_ITEM_CARD_ID: 'NO_ITEM_CARD_ID'
};

export const PhotoGallery = ({isLoading, urls = [], getAlt, getKey, error}: Props) => {
	return <LoadingErrorContainer isLoading={isLoading} error={error}>
		{urls.length 
			? <Container>
				{urls && urls.map((url, index) => <Image key={getKey(url)} height={200} width={200} alt={getAlt(index)} src={url} loading="lazy" />)}
			</Container> 
			: <div data-testid={Constants.NO_ITEM_CARD_ID}>
            No items to show
			</div>
		}
	</LoadingErrorContainer>;
};