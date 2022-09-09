import React from 'react';
import { LoadingErrorContainer } from '../LoadingErrorContainer';
import { Container, Image } from './styled';

type Props = {
    isLoading?: boolean
    urls?: string[]
    getAlt: (index: number) => string
    getKey: (url: string) => string
}

export const Constants = {
	NO_ITEM_CARD_ID: 'NO_ITEM_CARD_ID'
};

export const PhotoGallery = ({isLoading, urls = [], getAlt, getKey}: Props) => {
	return <LoadingErrorContainer isLoading={isLoading}>
		{urls.length 
			? <Container>
				{urls && urls.map((url, index) => <Image key={getKey(url)} height={200} width={200} alt={getAlt(index)} src={url} loading="lazy" />)}
			</Container> 
			: <div data-testid={Constants.NO_ITEM_CARD_ID}>
            no items to show
			</div>
		}
	</LoadingErrorContainer>;
};