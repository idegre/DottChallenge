import React, { ChangeEvent, LegacyRef, SyntheticEvent, useCallback, useRef } from 'react';
import {useSelector} from 'react-redux';
import {AppError, LoadingErrorContainer} from '../../components/LoadingErrorContainer';
import {getUserImageAsset} from '../../store/slices/userImage/selectors';
import { Container, HiddenInput, ImageContainer, VisibleInput } from './styled';

import locales from '../../locales/en';

type Props = {
  onLoad: (evt: SyntheticEvent<HTMLImageElement, Event>) => void,
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  isLoading?: boolean,
  error?: AppError | null
}

const inputProps = {
	type:'file',
	name:'file',
	accept:'image/jpeg;image/gif;image/tif;image/tiff;image/jpg;image/png'
};

export const ImageSelector = ({onLoad, onInputChange, isLoading = false, error}: Props) => {
	const selectedImage = useSelector(getUserImageAsset);

	const inputRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<LegacyRef<HTMLImageElement>>();

	const handleClick = useCallback(() => {
		inputRef.current?.click();
	}, []);

	return (
		<LoadingErrorContainer isLoading={isLoading} error={error}>
			<Container>
				{selectedImage ? (
					<ImageContainer>
						<img
							src={selectedImage}
							onLoad={onLoad}
							alt="user's upload"
							ref={imageRef.current}
						/>
					</ImageContainer>
				) : (<>
					<VisibleInput onClick={handleClick}>{locales.inputCTA}</VisibleInput>
					<HiddenInput>
						<input
							{...inputProps}
							ref={inputRef}
							onChange={onInputChange}
						/>
					</HiddenInput>
				</>
				)}
			</Container>
		</LoadingErrorContainer>
	);
};
